const {Recipe} = require("../../models/recipe");


const getOwnAll  = async (req, res) => { 
    console.log("getOwnAll")
    console.log("req=", req);
  
    const {_id} = req.user;

    const {page = 1, limit = 20, favorite = false} = req.query;
    const skip = (page - 1) * limit;

    const query = { owner: _id };

    if (favorite) {
        query.favorite = favorite;
    }


    const result = await Recipe.find(query, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email");

    const total=result.length;
    
    res.json({
        page: page,
        total: total,
        recipes: result});
};

module.exports = getOwnAll;    