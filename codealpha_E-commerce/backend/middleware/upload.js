import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
});

export default upload;
// export const singleUpload = upload.single("file");
// export const multipleUpload = upload.array("file");
