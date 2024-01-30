const Joi = require("joi");

const addRecipeSchema = Joi.object({
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
    prepTime: Joi.string().messages({
        'string.base': '"prepTime" should be a type of "string"',
        'string.empty': '"prepTime" cannot be an empty field',

    }),
    cookTime: Joi.string().required().messages({
        'string.base': '"cookTime" should be a type of "string"',
        'string.empty': '"cookTime" cannot be an empty field',
        'any.required': 'missing required cookTime field'
    }),
    calories: Joi.number().messages({
        'string.base': '"calories" should be a type of "number"',
        'string.empty': '"calories" cannot be an empty field',

    }),
    keyWords: Joi.string().messages({
        'string.base': '"keyWords" should be a type of "string"',
        'string.empty': '"keyWords" cannot be an empty field',

    }),
    portions: Joi.string().required().messages({
        'string.base': '"portions" should be a type of "string"',
        'string.empty': '"portions" cannot be an empty field',
        'any.required': 'missing required portions field'
    }),
    videoURL: Joi.string().messages({
        'string.base': '"videoURL" should be a type of "string"',
        'string.empty': '"videoURL" cannot be an empty field',

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
    tips: Joi.array().items(
        Joi.string().messages({
            'string.base': '"tips" should be a type of "string"',
            'string.empty': '"tips" cannot be an empty field',
            }),
    ),
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


const editRecipeSchema = Joi.object({
    title: Joi.string().messages({
        'string.base': '"title" should be a type of "string"',
        'string.empty': '"title" cannot be an empty field',

    }),
    description: Joi.string().messages({
        'string.base': '"description" should be a type of "string"',
        'string.empty': '"description" cannot be an empty field',

    }),
    mainPhotoURL:Joi.string().messages({
        'string.base': '"mainPhotoURL" should be a type of "string"',
        'string.empty': '"mainPhotoURL" cannot be an empty field',

    }),
    category: Joi.string().messages({
        'string.base': '"category" should be a type of "string"',
        'string.empty': '"category" cannot be an empty field',
   
    }),
    cuisine: Joi.string().messages({
        'string.base': '"cuisine" should be a type of "string"',
        'string.empty': '"cuisine" cannot be an empty field',
     
    }),
    difficulty: Joi.string().messages({
        'string.base': '"difficulty" should be a type of "string"',
        'string.empty': '"difficulty" cannot be an empty field',
      
    }),
    prepTime: Joi.string().messages({
        'string.base': '"prepTime" should be a type of "string"',
        'string.empty': '"prepTime" cannot be an empty field',

    }),
    cookTime: Joi.string().messages({
        'string.base': '"cookTime" should be a type of "string"',
        'string.empty': '"cookTime" cannot be an empty field',

    }),
    calories: Joi.number().messages({
        'string.base': '"calories" should be a type of "number"',
        'string.empty': '"calories" cannot be an empty field',

    }),
    keyWords: Joi.string().messages({
        'string.base': '"keyWords" should be a type of "string"',
        'string.empty': '"keyWords" cannot be an empty field',

    }),
    portions: Joi.string().messages({
        'string.base': '"portions" should be a type of "string"',
        'string.empty': '"portions" cannot be an empty field',
      
    }),
    videoURL: Joi.string().messages({
        'string.base': '"videoURL" should be a type of "string"',
        'string.empty': '"videoURL" cannot be an empty field',

    }),
    ingredients: Joi.array().items(
        Joi.object({ 
            categoryIngr: Joi.string().messages({
            'string.base': '"categoryIngr" should be a type of "string"',
            'string.empty': '"categoryIngr" cannot be an empty field',
            
            }),
            product: Joi.string().messages({
            'string.base': '"product" should be a type of "string"',
            'string.empty': '"product" cannot be an empty field',
           
            }),
            quantity: Joi.string().messages({
            'string.base': '"quantity" should be a type of "string"',
            'string.empty': '"quantity" cannot be an empty field',
          
            }),
            measure: Joi.string().messages({
            'string.base': '"measure" should be a type of "string"',
            'string.empty': '"measure" cannot be an empty field',
         
            }),
        })).min(1),
    tips: Joi.array().items(
        Joi.string().messages({
            'string.base': '"tips" should be a type of "string"',
            'string.empty': '"tips" cannot be an empty field',
            }),
    ),
    steps: Joi.array().items(
        Joi.object({
            stepDescription: Joi.string().messages({
                'string.base': '"stepDescription" should be a type of "string"',
                'string.empty': '"stepDescription" cannot be an empty field',
   
            }),
            // stepImages: Joi.array().items(
            //     Joi.object({
            //         stepPhotoURL: Joi.string().messages({
            //             'string.base': '"stepPhotoURL" should be a type of "string"',
            //             'string.empty': '"stepPhotoURL" cannot be an empty field',
           
            //         }),
            //     }),
            // ),
        })),
   
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addRecipeSchema,
    updateFavoriteSchema,
    editRecipeSchema,
}


module.exports = {
    schemas,
}