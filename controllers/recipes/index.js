const { ctrlWrapper } = require("../../helpers");
const getFilterAll = require('./getFilterAll');
const getOwnAll = require('./getOwnAll');
const getById=require('./getById');
const add=require('./add');
const updateById=require ('./updateById');
const deleteById=require ('./deleteById');
const updateStatusRecipe=require('./updateStatusRecipe');


module.exports = {
    getFilterAll: ctrlWrapper(getFilterAll),
    getOwnAll: ctrlWrapper(getOwnAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateStatusRecipe: ctrlWrapper(updateStatusRecipe),
 
}