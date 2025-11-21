import { calculateChunkSize, chunkFile } from '@/utils/FileUtil';
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';

const API_BASE_URL = 'http://localhost:7654/api/storage/upload_chunk';

export const useChunkedUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedChunks, setUploadedChunks] = useState(new Set());
  const [error, setError] = useState(null);

  const abortControllerRef = useRef<AbortController>(null);
  const uploadStateRef = useRef({
    uploadId: null,
    objectKey: null,
    totalChunks: 0,
    file: File,
  });

  // Initialize upload
  const initUpload = async (file: File) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/init`, {
        fileName: file.name,
        contentType: file.type,
        fileSize: file.size,
        extension: file.type,
      });
      console.log('response', response);
      return response.data?.data; // { uploadId, objectKey }
    } catch (err) {
      throw new Error('Failed to initialize upload: ' + err.message);
    }
  };

  // Upload single chunk
  const uploadChunk: any = async (
    url: string,
    chunk: Blob,
    uploadId: string,
    partNumber: number,
    retryCount = 0,
  ) => {
    const MAX_RETRIES = 3;

    try {
      // const formData = new FormData();
      // formData.append('file', chunk);
      // formData.append('uploadId', uploadId);
      // formData.append('partNumber', partNumber.toString());

      abortControllerRef.current = new AbortController();

      const response = await axios.put(url, chunk, {
        headers: {
          "Content-Type": "application/octet-stream"
        },
        signal: abortControllerRef.current.signal,
      });
      const etag = response?.headers?.['etag']?.replace(/"/g, "");
      console.log('etag', etag);
      console.log('response chunk', response);
      return {partNumber, etag};
    } catch (err) {
      if (axios.isCancel(err)) {
        throw new Error('Upload cancelled');
      }

      // Retry logic
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying chunk ${partNumber}, attempt ${retryCount + 1}`);
        await new Promise((resolve) => {
          setTimeout(resolve, 1000 * (retryCount + 1));
        });
        return uploadChunk(chunk, uploadId, partNumber, retryCount + 1);
      }

      throw new Error(`Failed to upload chunk ${partNumber}: ${err.message}`);
    }
  };

  // Complete upload
  const completeUpload = async (uploadId: string, allResults: []) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/complete`, {
        uploadId: uploadId,
        parts: allResults
      });

      return response.data; // { objectKey, fileUrl, totalParts }
    } catch (err) {
      throw new Error('Failed to complete upload: ' + err.message);
    }
  };

  // Abort upload
  const abortUpload = async (uploadId: string) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      await axios.delete(`${API_BASE_URL}/abort`, {
        params: { uploadId },
      });
    } catch (err) {
      console.error('Failed to abort upload:', err);
    }
  };

  // Main upload function
  const upload = useCallback(async (file: File, options = {}) => {
    const { concurrentUploads = 3, onChunkComplete, chunkSize: customChunkSize } = options;

    setUploading(true);
    setProgress(0);
    setError(null);
    setUploadedChunks(new Set());

    try {
      // 1. Initialize upload
      const { uploadId, totalChunks, chunkSize, chunkUrls } = await initUpload(file);

      // 2. Chunk file
      // const chunkSize = customChunkSize || calculateChunkSize(file.size);
      const chunks = chunkFile(file, chunkSize);
      // const totalChunks = chunks.length;

      uploadStateRef.current = {
        uploadId,
        totalChunks,
        file,
      };

      console.log('chunkSize:', chunkSize);
      console.log('chunks:', chunks);
      console.log('totalChunks:', totalChunks);
      console.log(`Starting upload: ${totalChunks} chunks, ${chunkSize / 1024 / 1024}MB per chunk`);

      // 3. Upload chunks với concurrency control
      const uploadedSet = new Set();
      const allResults = [];

      for (let i = 0; i < totalChunks; i += concurrentUploads) {
        const batch = [];

        for (let j = 0; j < concurrentUploads && i + j < totalChunks; j++) {
          const chunkIndex = i + j;
          const chunk = chunks[chunkIndex];
          const partNumber = chunkIndex + 1; // S3 part number starts from 1
          const url = chunkUrls[chunkIndex]?.url;

          batch.push(
            uploadChunk(url, chunk, uploadId, partNumber).then((result: any) => {
              uploadedSet.add(partNumber);
              setUploadedChunks(new Set(uploadedSet));

              const currentProgress = (uploadedSet.size / totalChunks) * 100;
              setProgress(currentProgress);

              if (onChunkComplete) {
                onChunkComplete(partNumber, totalChunks);
              }

              return result;
            }),
          );
        }

        const batchResults = await Promise.all(batch);

        allResults.push(...batchResults);
      }

      console.log('batch', allResults);

      // 4. Complete upload
      const result = await completeUpload(uploadId, allResults);

      setProgress(100);
      setUploading(false);

      return result;
    } catch (err) {
      setError(err.message);
      setUploading(false);

      // Cleanup on error
      if (uploadStateRef.current.uploadId) {
        await abortUpload(uploadStateRef.current.uploadId);
      }

      throw err;
    }
  }, []);

  // Resume upload
  const resume = useCallback(async () => {
    const { uploadId, file, totalChunks } = uploadStateRef.current;

    if (!uploadId || !file) {
      throw new Error('No upload to resume');
    }

    setUploading(true);
    setError(null);

    try {
      // Get uploaded parts from server
      const response = await axios.get(`${API_BASE_URL}/parts/${uploadId}`);
      const uploadedParts = new Set(response.data.map((p) => p.partNumber));

      setUploadedChunks(uploadedParts);
      setProgress((uploadedParts.size / totalChunks) * 100);

      // Upload remaining chunks
      const chunkSize = calculateChunkSize(file.size);
      const chunks = chunkFile(file, chunkSize);

      const uploadedSet = new Set(uploadedParts);

      for (let i = 0; i < chunks.length; i++) {
        const partNumber = i + 1;

        if (uploadedParts.has(partNumber)) {
          continue; // Skip already uploaded
        }

        await uploadChunk(chunks[i], uploadId, partNumber);

        uploadedSet.add(partNumber);
        setUploadedChunks(new Set(uploadedSet));
        setProgress((uploadedSet.size / totalChunks) * 100);
      }

      // Complete
      const result = await completeUpload(uploadId);
      setUploading(false);

      return result;
    } catch (err) {
      setError(err.message);
      setUploading(false);
      throw err;
    }
  }, []);

  // Cancel current upload
  const cancel = useCallback(async () => {
    if (uploadStateRef.current.uploadId) {
      await abortUpload(uploadStateRef.current.uploadId);
      setUploading(false);
      setProgress(0);
      setUploadedChunks(new Set());
    }
  }, []);

  return {
    upload,
    resume,
    cancel,
    uploading,
    progress,
    uploadedChunks,
    error,
    uploadState: uploadStateRef.current,
  };
};
