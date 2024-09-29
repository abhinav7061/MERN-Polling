const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

exports.uploadProfileImageToCloudinary = async (avatar, folder, public_id = null) => {
    try {
        // Convert buffer to a readable stream
        const stream = Readable.from(avatar.buffer);
        const uploadOptions = {
            resource_type: 'image',
            folder,
            overwrite: true,
        };

        if (public_id) {
            uploadOptions.public_id = public_id.split('/').pop();
        }

        // Upload image to Cloudinary
        const cloudinaryResponse = await new Promise((resolve, reject) => {
            const streamLoad = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.pipe(streamLoad);
        });

        return cloudinaryResponse;
    } catch (error) {
        console.log({ 'Error while uploading image': error });
    }
}

// Generate the optimized URL with transformations
exports.generateOptimizedUrl = (public_id, version) => {
    const optimizedUrl = cloudinary.url(public_id, {
        fetch_format: 'auto',
        quality: 'auto',
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
        secure: true,
        version
    });
    return optimizedUrl;
}

exports.deleteImageFromCloudinary = async (public_id) => {
    try {
        cloudinary.api.delete_resources_by_prefix(`polling/profile_images/${public_id}`, function (error, result) {
            console.log({ result, error });
        });
    } catch (error) {
        console.log(error);
    }
}

exports.checkIsImageAvailableOnCloudinary = async (public_id) => {
    try {
        await cloudinary.api.resource(`polling/profile_images/${public_id}`, function (error, result) {
            if (error) {
                console.log('Image not found, it has been deleted.');
            } else {
                console.log('Image still exists:', result);
            }
        });
    } catch (error) {
        console.log(error);
    }
}
