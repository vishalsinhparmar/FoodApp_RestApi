import { CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'
import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

// clodinary config


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "Foodapp", // Set the folder name in Cloudinary
      allowed_formats: ["jpeg", "png", "jpg"], // Allowed file types
    },
  });

  const upload = multer({storage});

  export default upload;