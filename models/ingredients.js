const {Schema} = require("mongoose");

const ingredientSchema = new Schema({
    categoryIngr:{
        type: String,
        required: [true, 'Set category of ingredients for recipe'],
    },
    product:  {
        type: String,
        required: [true, 'Set product for recipe'],
    },
    quantity:{
        type: Number,
        required: [true, 'Set quantity of product for recipe'],
    }, 
    measure:{
        type: String,
        required: [true, 'Set measure of product for recipe'],
    },
});

module.exports=ingredientSchema;
