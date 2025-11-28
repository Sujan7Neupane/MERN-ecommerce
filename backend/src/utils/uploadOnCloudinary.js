import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (!response) {
      console.log("Error while creating file!");
    }

    fs.unlinkSync(localFilePath);
    console.log("Local File deleted");

    return response;
  } catch (error) {
    try {
      fs.unlinkSync(localFilePath);
      console.log("Local file deleted due to error!");
    } catch (error) {
      console.error("Failed to delete Local File");
    }

    console.error("Error Uploading File...");
    return null;
  }
};

export default uploadOnCloudinary;
