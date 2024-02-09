const { ctrlWrapper } = require("../../helpers");
const getAll = require('./getAll');
const getOwnAll = require('./getOwnAll');
const getById=require('./getById');
const add=require('./add');
const updateById=require ('./updateById');
const deleteById=require ('./deleteById');
const updateStatusRecipe=require('./updateStatusRecipe');
const getCategoryAll = require('./getCategoryAll');


module.exports = {
    getAll: ctrlWrapper(getAll),
    getOwnAll: ctrlWrapper(getOwnAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateStatusRecipe: ctrlWrapper(updateStatusRecipe),
    getCategoryAll: ctrlWrapper(getCategoryAll),
}