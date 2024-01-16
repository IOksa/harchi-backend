const {Recipe} = require("../../models/recipe");

const add = async (req, res) => {
    console.log("add")
    console.log("req=", req)
    const {_id: owner} = req.user;
    const result = await Recipe.create({...req.body, owner});
    res.status(201).json(result);

};

module.exports = add;   