const {Recipe} = require("../../models/recipe");
const { HttpError} = require("../../helpers");

const updateById = async (req, res) => {

    const {id} = req.params;
    const result = await Recipe.findByIdAndUpdate(id, req.body,{new: true});
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
   
};

module.exports = updateById;   