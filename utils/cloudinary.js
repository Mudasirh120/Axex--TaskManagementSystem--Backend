import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const cloudinaryUpload = async (imagePath, folder) => {
  try {
    const res = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
      folder: `axex/${folder}`,
      overwrite: true,
      use_filename: false,
    });
    fs.unlinkSync(imagePath);
    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(imagePath);
    console.log("File => ", error);
    return null;
  }
};
export { cloudinaryUpload };
