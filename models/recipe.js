const {Schema, model} = require("mongoose");
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
        enum: ["Легко", "Помірно", "Складно"],
        required: [true, 'Set difficulty for recipe'],
    },
    prepTime:{
        type: String,
     
    },
    cookTime:{
        type:  String,
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
    mainPhotoCloudinaryId: {
        type: String,
    },
    
    favorite: {
        type: Boolean,
        default: false,
    },
      
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
     },
     username: {
        type: String,
      },
      avatar: {
        type: String,
      },
}, {versionKey: false, timestamps: true});

recipeSchema.post("save", handleMongooseError);

const Recipe = model("recipe", recipeSchema);

module.exports = {
    Recipe,

}