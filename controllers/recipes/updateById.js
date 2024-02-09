const isEmpty = require('lodash.isempty');
const {Recipe} = require("../../models/recipe");
const { handleCloudinaryUpload, handleCloudinaryDelete, HttpError } = require("../../helpers");

const updateById = async (req, res) => {
    console.log("updateById")
    console.log("req.body=", req.body)
    const {id} = req.params;
    let mainPhotoCloudinaryId;
    let mainPhotoURL;
    let updates={...req.body};
    // console.log("updates=", updates)
    const oldData = await Recipe.findById(id);
    console.log("oldData=", oldData)
    const updateSteps={steps: oldData.steps};
    // console.log("tempStep=", updateSteps);
    // let newSteps=[];

    if(req?.files && !isEmpty(req.files)){ 
        console.log("req.files=", req.files)
        const keys = Object.keys(req.files);

        for (const key of keys) {
            const imagesArray=[];
            for (let i = 0; i < req.files[key].length; i += 1) {
                const cldRes = await handleCloudinaryUpload(req.files[key][i].path);
                // console.log("cldRes=", cldRes)
                if(key==="mainPhoto"){
                    mainPhotoCloudinaryId=cldRes.public_id;
                    mainPhotoURL =cldRes.secure_url;

                    await handleCloudinaryDelete(oldData.mainPhotoCloudinaryId);    
                       
                }
                if(key.includes("stepPhoto")){
                    console.log("Here")
                    const index=key.slice(9);
                    console.log("index=", index)
                    imagesArray.push({stepPhotoCloudinaryId:cldRes.public_id, stepPhotoURL:cldRes.secure_url});
                    console.log("imagesArray=", imagesArray)
    
                    updates.steps[index-1]={...updates.steps[index-1], stepImages:imagesArray}; 
                    // updateSteps.steps[index-1].stepImages[index-1]=imagesArray; 
                    console.log("updates=", updates)
                    console.log("Here2")
                    if(oldData.steps[index-1]?.stepImages){  
                        for (let i = 0; i < oldData.steps[index-1].stepImages.length; i += 1) {
                            await handleCloudinaryDelete(oldData.steps[index-1].stepImages[i].stepPhotoCloudinaryId);
                        }
                    }
                }
            }
        }

        // console.log("updateSteps=", updateSteps)
        updates={...updates, mainPhotoCloudinaryId, mainPhotoURL}
        console.log("updates=", updates)
    }

    // delete mainPhoto
    if(req.body?.mainPhotoURL===" "){
        await handleCloudinaryDelete(oldData.mainPhotoCloudinaryId);
        updates={...updates, mainPhotoCloudinaryId:" "};
    }
    // add or edit steps
    // if(req.body?.steps){
    //     for (let i = 0; i < req.body.steps.length; i += 1) {
    //         if(req.body.steps[i]._id!=="undefined"){
    //             newSteps=oldData.steps.map(step => {
    //                 if(step._id.toString()===req.body.steps[i]._id){
    //                     step.stepDescription=req.body.steps[i].stepDescription;
    //                 } 
    //                 return step;
    //             })
    //         }
    //         else{
    //             updateSteps.steps.push({stepDescription: req.body.steps[i].stepDescription});
    //         }
      
    //     }
    //     console.log("newSteps", newSteps)
    
    // }

    // updates={...updates, newSteps}
    const result = await Recipe.findByIdAndUpdate(id, {$set: updates},{new: true});

    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
   
};

module.exports = updateById;   