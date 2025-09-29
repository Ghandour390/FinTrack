

const express = require('express');
const router = express.Router();
const categorieController = require('../controller/CategorieController');
const requireAuth = require('../middleware/requireAuth');

router.get('/', requireAuth, (req, res) => categorieController.getAllCategories(req, res));
router.post('/', requireAuth, (req, res) => categorieController.createCategory(req, res));
router.put('/:id', requireAuth, (req, res) => categorieController.updateCategory(req, res));
router.delete('/:id', requireAuth, (req, res) => categorieController.deleteCategory(req, res));

module.exports = router;