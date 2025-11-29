import {FILE_ICON_MAP} from "@/core/constant";

export const chunkFile = (file: File, chunkSize = 5 * 1024 * 1024) => {
  // 5MB default
  const chunks = [];
  let offset = 0;

  while (offset < file.size) {
    const chunk = file.slice(offset, offset + chunkSize);
    chunks.push(chunk);
    offset += chunkSize;
  }

  return chunks;
};

export const calculateChunkSize = (fileSize: number) => {
  // MinIO max 10,000 parts
  const MAX_PARTS = 10000;
  const MIN_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_CHUNK_SIZE = 100 * 1024 * 1024; // 100MB

  let chunkSize = Math.ceil(fileSize / MAX_PARTS);

  // Đảm bảo chunk size >= 5MB
  if (chunkSize < MIN_CHUNK_SIZE) {
    chunkSize = MIN_CHUNK_SIZE;
  }

  // Giới hạn max chunk size
  if (chunkSize > MAX_CHUNK_SIZE) {
    chunkSize = MAX_CHUNK_SIZE;
  }

  return chunkSize;
};

export const getFileCategory = (file: File) => {
  const type = file.type;

  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  if (type === 'application/pdf') return 'pdf';

  // office docs
  if (
    type.includes('word') ||
    type.includes('excel') ||
    type.includes('presentation') ||
    type.includes('sheet') ||
    type.includes('msword')
  ) {
    return 'document';
  }

  return 'other';
};

export const getFileExtension = (file: File): string => {
  const name = file.name;
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

export const getFileIcon = (file: File): string => {
  const ext = getFileExtension(file);

  return FILE_ICON_MAP[ext] ?? "/icons/file-preview/unknown.svg"; // default
}

const roundTo = (num: number, digits: number) =>
  Math.round(num * 10**digits) / 10**digits;

export const bytesToMB = (bytes: number, digits = 2) => {
  const mb = bytes / (1024 * 1024);
  return roundTo(mb, digits);
};
