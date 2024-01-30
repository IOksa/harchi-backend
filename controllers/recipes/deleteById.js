const {Recipe} = require("../../models/recipe");
const { HttpError, handleCloudinaryDelete} = require("../../helpers");

const deleteById = async (req, res) => {
  
    const {id} = req.params;

    const oldData = await Recipe.findById(id);
    await handleCloudinaryDelete(oldData?.mainPhotoCloudinaryId);
    for (let i = 0; i < oldData?.steps.length; i += 1) {
        console.log("i=", i)
        if(oldData.steps[i].stepImages){
            for (let j = 0; j < oldData.steps[i].stepImages.length; j += 1) {
                console.log("j=",j)
                console.log(oldData.steps[i].stepImages[j].stepPhotoCloudinaryId);
                await handleCloudinaryDelete(oldData.steps[i].stepImages[j].stepPhotoCloudinaryId);
            }
        }
    }
    
    const result = await Recipe.findByIdAndDelete(id);
    if(!result) {
        throw HttpError(404, "Not found");
    }

    res.json({
    message: "recipe was deleted"
    })
    
};

module.exports = deleteById;   