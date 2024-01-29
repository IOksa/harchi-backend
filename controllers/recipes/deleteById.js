const {Recipe} = require("../../models/recipe");
const { HttpError} = require("../../helpers");

const deleteById = async (req, res) => {
  
    const {id} = req.params;
    const result = await Recipe.findByIdAndDelete(id);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    
    res.json({
    message: "recipe was deleted"
    })
    
};

module.exports = deleteById;   