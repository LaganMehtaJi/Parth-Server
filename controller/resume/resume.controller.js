import fs from 'fs';

export const folderName = 'uploads/';

const EjsUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please send EJS file' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file.filename
  });
};

export default EjsUpload;
