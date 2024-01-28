const {Schema} = require("mongoose");

const imagesSchema = new Schema({
    stepPhotoURL:{
        type: String,

    },
    stepPhotoCloudinaryId: {
        type: String,

    }
});

const stepSchema = new Schema({
    stepDescription: {
        type: String, 
        required: [true, 'Set description of step for recipe'],
    },
    stepImages:[imagesSchema],
    
});

module.exports=stepSchema;