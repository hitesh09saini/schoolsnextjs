const cloudinary = require('cloudinary')
const fs = require('fs');

const cloudinaryURl = async (localFilePath) => {

    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: 'lms',
            gravity: 'face',
            crop: 'fill',
            width: 300,
            height: 300,
        })
        // file has been uploaded successfull
        // console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteCloudinaryUrl = async (publicId)=>{
    await cloudinary.v2.uploader.destroy(publicId)
}

module.exports ={ cloudinaryURl, deleteCloudinaryUrl};