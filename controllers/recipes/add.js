const cloudinary = require("cloudinary").v2;
const {Recipe} = require("../../models/recipe");

const { handleCloudinaryUpload } = require("../../helpers");

const add = async (req, res) => {
    // console.log("add")
    const {id: owner} = req.user;
    let result;

    if(req?.files){   
        const cldRes = await handleCloudinaryUpload(req.files.mainPhoto[0].path);
        // console.log("req=", req);
        const mainPhotoCloudinaryId=cldRes.public_id;
        const mainPhotoURL =cldRes.secure_url;
        // console.log("mainPhotoURL=", mainPhotoURL);
        // console.log("cloudinaryId=", cloudinaryId);
        // const create = {...req.body, mainPhotoURL, mainPhotoCloudinaryId};
        result = await Recipe.create({...req.body, mainPhotoURL, mainPhotoCloudinaryId, owner});
        res.status(201).json(result);
    
    }
    else{
        result = await Recipe.create({...req.body, owner});
        res.status(201).json(result);
    }

};

module.exports = add;   