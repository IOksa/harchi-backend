const {Schema} = require("mongoose");

const stepSchema = new Schema({
    stepDescription: {
        type: String, 
        required: [true, 'Set description of step for recipe'],
    },
    stepPhotoURL:{
        type: String,

    },
    stepPhotoCloudinaryId: {
        type: String,

    },
});

module.exports=stepSchema;