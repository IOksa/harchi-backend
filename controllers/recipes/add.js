const isEmpty = require('lodash.isempty');
const {Recipe} = require("../../models/recipe");

const { handleCloudinaryUpload } = require("../../helpers");

const add = async (req, res) => { 
    const {id: owner, username, avatar} = req.user;
    let result;
    let mainPhotoCloudinaryId;
    let mainPhotoURL;
    const create={...req.body};

    if(req?.files && !isEmpty(req.files)){ 
  
        const keys = Object.keys(req.files);

        for (const key of keys) {
            const imagesArray=[];
            for (let i = 0; i < req.files[key].length; i += 1) {
                const cldRes = await handleCloudinaryUpload(req.files[key][i].path);
                
                if(key==="mainPhoto"){
                    mainPhotoCloudinaryId=cldRes.public_id;
                    mainPhotoURL =cldRes.secure_url;
                }
                if(key.includes("stepPhoto")){
                    const index=key.slice(9);
                    imagesArray.push({stepPhotoCloudinaryId:cldRes.public_id, stepPhotoURL:cldRes.secure_url});
                    create.steps[index-1]={...create.steps[index-1], stepImages:imagesArray}; 
                  
                }
            }
        }

        result = await Recipe.create({...create, mainPhotoURL, mainPhotoCloudinaryId, owner, username, avatar});
        res.status(201).json(result);
    
    }
    else{
        result = await Recipe.create({...create, owner});
        res.status(201).json(result);
    }

};

module.exports = add;   