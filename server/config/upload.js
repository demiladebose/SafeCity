import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

console.log(
  "Upload.js using cloudinary config:",
  cloudinary.config().cloud_name
);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "safecity_uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

export default upload;
