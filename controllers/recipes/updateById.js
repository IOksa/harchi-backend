const isEmpty = require('lodash.isempty');
const {Recipe} = require("../../models/recipe");
const { handleCloudinaryUpload, handleCloudinaryDelete, HttpError } = require("../../helpers");

const updateById = async (req, res) => {
    const {id} = req.params;
    let mainPhotoCloudinaryId;
    let mainPhotoURL;
    let updates={...req.body};
    const oldData = await Recipe.findById(id);

    if(req?.files && !isEmpty(req.files)){ 
        console.log("req.files=", req.files)
        const keys = Object.keys(req.files);

        for (const key of keys) {
            const imagesArray=[];
            for (let i = 0; i < req.files[key].length; i += 1) {
                const cldRes = await handleCloudinaryUpload(req.files[key][i].path);

                if(key==="mainPhoto"){
                    mainPhotoCloudinaryId=cldRes.public_id;
                    mainPhotoURL =cldRes.secure_url;

                    await handleCloudinaryDelete(oldData.mainPhotoCloudinaryId);    
                       
                }
                if(key.includes("stepPhoto")){
                    const index=key.slice(9);
                    imagesArray.push({stepPhotoCloudinaryId:cldRes.public_id, stepPhotoURL:cldRes.secure_url});
          
                    updates.steps[index-1]={...updates.steps[index-1], stepImages:imagesArray}; 
                    if(oldData.steps[index-1]?.stepImages){  
                        for (let i = 0; i < oldData.steps[index-1].stepImages.length; i += 1) {
                            await handleCloudinaryDelete(oldData.steps[index-1].stepImages[i].stepPhotoCloudinaryId);
                        }
                    }
                }
            }
        }

        updates={...updates, mainPhotoCloudinaryId, mainPhotoURL}
        console.log("updates=", updates)
    }

    // delete mainPhoto
    if(req.body?.mainPhotoURL===" "){
        await handleCloudinaryDelete(oldData.mainPhotoCloudinaryId);
        updates={...updates, mainPhotoCloudinaryId:" "};
    }

    const result = await Recipe.findByIdAndUpdate(id, {$set: updates},{new: true});

    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
   
};

module.exports = updateById;   