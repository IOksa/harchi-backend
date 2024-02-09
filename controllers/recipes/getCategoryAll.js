const {Recipe} = require("../../models/recipe");

const getCategoryAll  = async (req, res) => { 
    console.log("getCategoryAll");
    const { page = 1, limit = 4, categoryName } = req.query;
    console.log("categoryName=", categoryName);
    const skip = (page - 1) * limit;
    const recipeCategoryAll = await Recipe.find({category: categoryName}, {}, { skip, limit });
  
    res.status(200).json(recipeCategoryAll);
  }

  module.exports = getCategoryAll;