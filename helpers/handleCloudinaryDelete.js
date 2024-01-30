const cloudinary = require("cloudinary").v2;

async function handleCloudinaryDelete(cloudinaryId){
    if(cloudinaryId){
        await cloudinary.uploader.destroy(cloudinaryId);
        
    }

}

module.exports = handleCloudinaryDelete;