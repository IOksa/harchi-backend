const express = require('express');
const ctrl = require("../../controllers/recipes");

const {validateBody, isValidId, authenticate, uploadAndValidate} = require("../../middlewares");
const {schemas} = require("../../models/recipeJoiSchemas");

const router = express.Router();

router.get('/', ctrl.getFilterAll);

router.post('/', authenticate, uploadAndValidate(schemas.addRecipeSchema), ctrl.add);

router.get('/own', authenticate, ctrl.getOwnAll);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

router.patch('/:id', authenticate, isValidId, uploadAndValidate(schemas.editRecipeSchema), ctrl.updateById);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusRecipe);




module.exports = router;