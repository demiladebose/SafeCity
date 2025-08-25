import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage configuration for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "reports", // 👈 images will go inside "reports" folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Multer upload instance
const upload = multer({ storage });

// Export both
export { cloudinary, upload };
