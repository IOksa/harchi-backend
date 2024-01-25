const cloudinary = require("cloudinary").v2;
const _ = require('lodash');
const {Recipe} = require("../../models/recipe");

const { handleCloudinaryUpload } = require("../../helpers");

const add = async (req, res) => {
    console.log("add")
    const {id: owner} = req.user;
    let result;
    let mainPhotoCloudinaryId;
    let mainPhotoURL;
    const body={...req.body};

    if(req?.files && !_.isEmpty(req.files)){ 
        const keys = Object.keys(req.files);
        for (const key of keys) {
            for (let i = 0; i < req.files[key].length; i += 1) {
                const cldRes = await handleCloudinaryUpload(req.files[key][i].path);
                if(key==="mainPhoto"){
                    mainPhotoCloudinaryId=cldRes.public_id;
                    mainPhotoURL =cldRes.secure_url;
                }
                if(key.includes("stepPhoto")){
                    const index=key.slice(9);
                    body.steps[index-1]={...body.steps[index-1], stepPhotoCloudinaryId:cldRes.public_id, stepPhotoURL:cldRes.secure_url};                  
                }
            }
        
          
        }

        result = await Recipe.create({...body, mainPhotoURL, mainPhotoCloudinaryId, owner});
        res.status(201).json(result);
    
    }
    else{
        result = await Recipe.create({...req.body, owner});
        res.status(201).json(result);
    }

};

module.exports = add;   