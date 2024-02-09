const {Recipe} = require("../../models/recipe");

const getFilterAll  = async (req, res) => { 
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
  
    const recipeFilterAll =  await Recipe.find(req.query, {}, { skip, limit })
  
    res.status(200).json(recipeFilterAll);
  }

  module.exports = getFilterAll;