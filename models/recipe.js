const {Schema, model} = require("mongoose");
const Joi = require("joi");
const ingredientSchema = require ("./ingredients");
const stepSchema=require("./steps");
const {handleMongooseError} = require("../helpers");

const recipeSchema = new Schema({ 
    title: {
        type: String,
        minlength: 2,
        maxlength: 300,
        required: [true, 'Set title for recipe'],
    },
    // postedDate:{
    //     type: Date,
    //     default: currentTime,
    // },
    description:{
        type: String,
        required: [true, 'Set description for recipe'],
    },
    mainPhotoURL:{
        type: String,
    },
    category:{
        type: String,
        required: [true, 'Set category for recipe'],
        // добавить массив значений
    },
    cuisine:{
        type: String,
        required: [true, 'Set cuisine for recipe'],
        // добавить массив значений
    },
    difficulty:{
        type: String,
        required: [true, 'Set difficulty for recipe'],
    },
    prepTime:{
        type: Date,
     
    },
    cookTime:{
        type: Date,
        required: [true, 'Set cookTime for recipe'],
    },
    calories:{
        type: Number,
    },
    keyWords: {
        type: String,
    },
    portions:{
        type: Number,
        required: [true, 'Set portions for recipe'],
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
    
    favorite: {
        type: Boolean,
        default: false,
    },
      
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    description: Joi.string().required().messages({
        'string.base': '"description" should be a type of "string"',
        'string.empty': '"description" cannot be an empty field',
        'any.required': 'missing required description field'
    }),
    category: Joi.string().required().messages({
        'string.base': '"category" should be a type of "string"',
        'string.empty': '"category" cannot be an empty field',
        'any.required': 'missing required category field'
    }),
    cuisine: Joi.string().required().messages({
        'string.base': '"cuisine" should be a type of "string"',
        'string.empty': '"cuisine" cannot be an empty field',
        'any.required': 'missing required cuisine field'
    }),
    difficulty: Joi.string().required().messages({
        'string.base': '"difficulty" should be a type of "string"',
        'string.empty': '"difficulty" cannot be an empty field',
        'any.required': 'missing required difficulty field'
    }),
    cookTime: Joi.string().required().messages({
        'string.base': '"cookTime" should be a type of "string"',
        'string.empty': '"cookTime" cannot be an empty field',
        'any.required': 'missing required cookTime field'
    }),
    portions: Joi.string().required().messages({
        'string.base': '"portions" should be a type of "string"',
        'string.empty': '"portions" cannot be an empty field',
        'any.required': 'missing required portions field'
    }),

    ingredients: Joi.array().items(
        Joi.object({ 
            categoryIngr: Joi.string().required().messages({
            'string.base': '"categoryIngr" should be a type of "string"',
            'string.empty': '"categoryIngr" cannot be an empty field',
            'any.required': 'missing required categoryIngr field'
            }),
            product: Joi.string().required().messages({
            'string.base': '"product" should be a type of "string"',
            'string.empty': '"product" cannot be an empty field',
            'any.required': 'missing required product field'
            }),
            quantity: Joi.string().required().messages({
            'string.base': '"quantity" should be a type of "string"',
            'string.empty': '"quantity" cannot be an empty field',
            'any.required': 'missing required quantity field'
            }),
            measure: Joi.string().required().messages({
            'string.base': '"measure" should be a type of "string"',
            'string.empty': '"measure" cannot be an empty field',
            'any.required': 'missing required measure field'
            }),
        })).min(1).required(),
    steps: Joi.array().items(
        Joi.object({
            stepDescription: Joi.string().required().messages({
                'string.base': '"stepDescription" should be a type of "string"',
                'string.empty': '"stepDescription" cannot be an empty field',
                'any.required': 'missing required stepDescription field'
            }),
        })).min(1).required(),

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