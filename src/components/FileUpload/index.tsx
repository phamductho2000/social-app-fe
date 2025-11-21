import { useChunkedUpload } from '@/hooks/useChunkedUpload';
import React, { useState, useRef } from 'react';
import './style.css';
import {Button} from "antd";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const fileInputRef = useRef(null);

  const {
    upload,
    resume,
    cancel,
    uploading,
    progress,
    uploadedChunks,
    error,
    uploadState
  } = useChunkedUpload();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await upload(selectedFile, {
        concurrentUploads: 3,
        onChunkComplete: (chunkNumber: number, totalChunks: number) => {
          console.log(`Uploaded chunk ${chunkNumber}/${totalChunks}`);
        }
      });

      setUploadResult(result);
      console.log('Upload completed:', result);

    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleResume = async () => {
    try {
      const result = await resume();
      setUploadResult(result);
      console.log('Upload resumed and completed:', result);
    } catch (err) {
      console.error('Resume failed:', err);
    }
  };

  const handleCancel = async () => {
    await cancel();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatProgress = (progress) => {
    return progress.toFixed(2) + '%';
  };

  return (
    <div className="file-uploader">
      <h2>Chunked File Upload</h2>

      {/* File Input */}
      <div className="upload-section">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          disabled={uploading}
          className="file-input"
        />

        {selectedFile && (
          <div className="file-info">
            <p><strong>File:</strong> {selectedFile.name}</p>
            <p><strong>Size:</strong> {formatFileSize(selectedFile.size)}</p>
            <p><strong>Type:</strong> {selectedFile.type || 'Unknown'}</p>
          </div>
        )}
      </div>

      {/* Upload Controls */}
      <div className="controls">
        {!uploading && selectedFile && !uploadResult && (
          <Button onClick={handleUpload} className="btn btn-primary">
            Start Upload
          </Button>
        )}

        {uploading && (
          <Button onClick={handleCancel} className="btn btn-danger">
            Cancel Upload
          </Button>
        )}

        {error && uploadState.uploadId && (
          <Button onClick={handleResume} className="btn btn-warning">
            Resume Upload
          </Button>
        )}
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="progress-section">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-info">
            <span>{formatProgress(progress)}</span>
            <span>
              {uploadedChunks.size} / {uploadState.totalChunks} chunks
            </span>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <p>❌ Error: {error}</p>
        </div>
      )}

      {/* Success Result */}
      {uploadResult && (
        <div className="success-message">
          <p>✅ Upload completed successfully!</p>
          <div className="result-info">
            <p><strong>Object Key:</strong> {uploadResult.objectKey}</p>
            <p><strong>Total Parts:</strong> {uploadResult.totalParts}</p>
            {uploadResult.fileUrl && (
              <a
                href={uploadResult.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="download-link"
              >
                Download File
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
