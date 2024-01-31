export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;
  let size;
  if (bytes < mb) size = `${(bytes / kb).toFixed(2)} KB`;
  else if (bytes < gb) size = `${(bytes / mb).toFixed(2)} MB`;
  else size = `${(bytes / gb).toFixed(2)} GB`;
  return size;
};