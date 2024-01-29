const cloudinary = require("cloudinary").v2;
const _ = require('lodash');
const {Recipe} = require("../../models/recipe");
const { handleCloudinaryUpload, HttpError } = require("../../helpers");

const updateById = async (req, res) => {

    const {id} = req.params;
    console.log(req);
    let result;
    let mainPhotoCloudinaryId;
    let mainPhotoURL;
    let updates={...req.body};
    const oldData = await Recipe.findById(id);

    if(req?.files && !_.isEmpty(req.files)){ 
        console.log("req.files", req.files);
        const keys = Object.keys(req.files);

        for (const key of keys) {
            const imagesArray=[];
            for (let i = 0; i < req.files[key].length; i += 1) {
                const cldRes = await handleCloudinaryUpload(req.files[key][i].path);
                
                if(key==="mainPhoto"){
                    mainPhotoCloudinaryId=cldRes.public_id;
                    mainPhotoURL =cldRes.secure_url;
                                   
                    if(oldData.mainPhotoCloudinaryId){
                        await cloudinary.uploader.destroy(oldData.mainPhotoCloudinaryId);
                        
                    }
                }
                if(key.includes("stepPhoto")){
                    const index=key.slice(9);
                    imagesArray.push({stepPhotoCloudinaryId:cldRes.public_id, stepPhotoURL:cldRes.secure_url});
                    updates.steps[index-1]={...updates.steps[index-1], stepImages:imagesArray}; 

                    if(oldData.steps[index-1].stepImages){
                        for (let i = 0; i < oldData.steps[index-1].stepImages.length; i += 1) {
                            await cloudinary.uploader.destroy(oldData.steps[index-1].stepImages[i].stepPhotoCloudinaryId);
                        }
                    }
                }
            }
        }
        updates={...updates, mainPhotoCloudinaryId, mainPhotoURL}

        result = await Recipe.findByIdAndUpdate(id, {$set: updates},{new: true});
    
    }
    else{
        result = await Recipe.findByIdAndUpdate(id, req.body, {new: true});
    }
   
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
   
};

module.exports = updateById;   