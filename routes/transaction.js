const express = require('express');
const router = express.Router();
const transactionController = require('../controller/TransactionController');
const requireAuth = require('../middleware/requireAuth');


router.get('/', requireAuth, transactionController.getAllTransactionsUserAuth);
router.post('/', requireAuth, transactionController.createTransaction);
router.delete('/:id', requireAuth, transactionController.deleteTransaction);
router.put('/:id', requireAuth, transactionController.updateTransaction);
router.get('/:id', requireAuth, transactionController.getTransactionById);

module.exports = router;