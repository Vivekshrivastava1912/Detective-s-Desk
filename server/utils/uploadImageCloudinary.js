import { v2 as cloudinary } from 'cloudinary';

// Config check (Optional: Logs to verify keys)
// console.log("Cloud Config:", process.env.CLOUDINARY_NAME); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_API_KEY
})

const uploadImageCloudinary = async (image) => {
    // Buffer conversion logic
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

    const uploadImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: "BLINK" }, (error, uploadResult) => {
            if (error) {
                console.log("Cloudinary Error:", error); // Error log karein
                return reject(error)
            }
            return resolve(uploadResult)
        });
        
        // Stream end karna zaroori hai
        uploadStream.end(buffer);
    })

    return uploadImage
}

export default uploadImageCloudinary