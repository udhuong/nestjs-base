export const uploadConfig = {
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'video/mp4',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  ],
  maxSize: 5 * 1024 * 1024, // 5MB
  destination: './uploads',
};
