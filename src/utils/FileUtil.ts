export const chunkFile = (file: File, chunkSize = 5 * 1024 * 1024) => { // 5MB default
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
