const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const currentTime = new Date();

const ingredientSchema = new Schema({
    name:  {
        type: String
    },
    quantity:{
        type: Number
    }, 
    measure:{
        type: String
    },
});
const stepSchema = new Schema({
    description: {
        type: String,
    },
    photoURL:{
        type: String,
    },
});
const recipeSchema = new Schema({ 
    title: {
        type: String,
        minlength: 2,
        maxlength: 300,
        required: [true, 'Set title for recipe'],
    },
    postedDate:{
        type: Date,
        default: currentTime,
    },
    description:{
        type: String,
    },
    mainPhotoURL:{
        type: String,
    },
    category:{
        type: String,
        // добавить массив значений
    },
    meal:{
        type: String,
        // добавить массив значений
    },
    cuisine:{
        type: String,
        // добавить массив значений
    },
    prepTime:{
        type: Date,
        required: true,
    },
    cookTime:{
        type: Date,
        required: true,
    },
    calories:{
        type: Number,
    },
    videoURL:{
        type: String,
    },
    ingredients: {
        type: [ingredientSchema],
    },
    tips: [String],
    steps: {
        type: [stepSchema],
    },
    keyWords: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
      
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
     }
}, {versionKey: false, timestamps: true});

recipeSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.base': '"title" should be a type of "string"',
      'string.empty': '"title" cannot be an empty field',
      'any.required': 'missing required title field'
    }),
    // email: Joi.string().required().messages({
    //   'string.base': '"email" should be a type of "string"',
    //   'string.empty': '"email" cannot be an empty field',
    //   'any.required': 'missing required email field'
    // }),
    // phone: Joi.string().required().messages({
    //   'string.base': '"phone" should be a type of "string"',
    //   'string.empty': '"phone" cannot be an empty field',
    //   'any.required': 'missing required phone field'
    // }),
    
    favorite: Joi.boolean().messages({
       'string.base': '"favorite" should be a type of "boolean"',
       'string.empty': '"favorite" cannot be an empty field'
       
      }),
   
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Recipe = model("recipe", recipeSchema);

module.exports = {
    Recipe,
    schemas,
}