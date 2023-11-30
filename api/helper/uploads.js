const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

exports.uploadProfileImageToCloudinary = async (image, user_id) => {
    try {
        // Upload image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload_stream({
            resource_type: 'image',
            public_id: `user_profile_pictures/${user_id}`, // Set a unique identifier for each user
            folder: 'user_profile_pictures',
            overwrite: true,
        }, (error, result) => {
            if (error) {
                throw error;
            }
        }).end(image.buffer);
        return cloudinaryResponse;
    } catch (error) {
        console.log({ 'Error while uploading image': error });
    }
}

exports.unlinkPreviousImage = async (directory, url) => {
    try {
        // Construct the previous file path based on the user ID (ignoring extension)
        const previousFilePath = `${directory}/${url}.*`;

        // Get an array of files that match the pattern
        const matchingFiles = fs.readdirSync(directory).filter(file => new RegExp(`${url}.*`).test(file));

        // Delete each matching file
        matchingFiles.forEach(file => {
            fs.unlinkSync(`${directory}/${file}`);
        });
    } catch (error) {
        console.log({ 'Error while deleting previous image': error });
    }
}

exports.uploadImageToOwnServer = (image, userId) => {
    try {
        const { originalname, path } = image;

        // Extract directory from the original path
        const directory = path.substring(0, path.lastIndexOf('/'));

        // Extract file extension
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];

        // Move uploaded image to desired location and rename it with the user id
        const newPath = userId ? `${directory}/${userId}.${ext}` : `${path}.${ext}`;

        // Rename the file
        fs.renameSync(path, newPath);

        return userId ? `${userId}.${ext}` : `${image.filename}.${ext}`;
    } catch (error) {
        console.log({ 'Error while uploading image': error });
    }
};