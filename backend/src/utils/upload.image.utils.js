const cloudinary = require('../configs/cloudinary.config.js');

const uploadImage = async (file) => { 
  let uploadedImage = null;

  // Check if the file buffer exists
  if (!file || !file.buffer) {
    //console.error('File is empty or missing buffer:', file);
    return null;
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', upload_preset: 'appkyc' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );

      // Pipe the buffer into Cloudinary
      uploadStream.end(file.buffer);
    });

    uploadedImage = result;
  } catch (error) {
    console.error('Image upload failed:', error);
  }

  return uploadedImage;
};

// Delete multiple images from Cloudinary
const deleteImages = async (imageUrls) => {
  const deletionPromises = imageUrls.map(async (imageUrl) => {
    try {
      // Extract the public_id from the URL
      const publicId = imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
      console.log(`Deleted image with public_id: ${publicId}`);
    } catch (error) {
      console.error(`Failed to delete image ${imageUrl}:`, error);
    }
  });

  await Promise.all(deletionPromises);
  return { message: 'Images deleted successfully' };
};

module.exports= {uploadImage};

