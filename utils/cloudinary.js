import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const cloudinaryUpload = async (imagePath, folder) => {
  try {
    console.log(imagePath);
    const res = await cloudinary.uploader.upload(imagePath, {
      resource_type: "image",
      folder: `axex/${folder}`,
      overwrite: true,
      use_filename: false,
    });
    console.log(res);
    // const fileBakchodi = fs.unlinkSync(imagePath);
    // console.log(fileBakchodi);
    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(imagePath);
    console.log("File => ", error);
    return null;
  }
};
export { cloudinaryUpload };
