const {Recipe} = require("../../models/recipe");

const getAll  = async (req, res) => { 
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const recipeAll = await Recipe.find({}, {}, { skip, limit });
  
    res.status(200).json(recipeAll);
  }

  module.exports = getAll;