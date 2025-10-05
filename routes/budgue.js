const express = require('express');
const router = express.Router();
const budgueController = require('../controller/BudgueController');
const requireAuth = require('../middleware/requireAuth');

router.get('/', requireAuth, (req, res) => budgueController.getAllBudgues(req, res));
router.get('/:id', requireAuth,(req, res) => budgueController.getBudgueById(req, res));
router.post('/', requireAuth, (req, res) => budgueController.createBudgue(req, res));
router.put('/:id', requireAuth, (req, res) => budgueController.updateBudgue(req, res));
router.delete('/:id', requireAuth, (req, res) => budgueController.deleteBudgue(req, res));

module.exports = router;