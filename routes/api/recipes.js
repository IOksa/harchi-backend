const express = require('express');
const ctrl = require("../../controllers/recipes");

const {validateBody, isValidId, authenticate} = require("../../middlewares");
const {schemas} = require("../../models/recipe");

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/own', authenticate, ctrl.getOwnAll);
// router.get('/own', ctrl.getOwnAll);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);
// router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusRecipe);

module.exports = router;