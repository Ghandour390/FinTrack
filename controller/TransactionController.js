const { Transaction } = require("../models");


class TransactionController {
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.findAll();
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Internal server error" });   
    }
  };
async getAllTransactionsUserAuth(){
  try {
    const transactions = await Transaction.findAll({where: {userId: req.user.id}});
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
    // Create a new transaction
    async createTransaction(req, res) {
        const { amount, date, description, categoryId } = req.body;
        try {
            const userId = req.user.id; // Assuming user ID is available in req.user
            const newTransaction = await Transaction.create({ amount, date, description, userId, categoryId });
            res.status(201).json(newTransaction);
        } catch (error) {
            console.error("Error creating transaction:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    // Delete a transaction
    async deleteTransaction(req, res) {
        const { id } = req.params;
        try {
            const transaction = await Transaction.findByPk(id);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }
            await transaction.destroy();
            res.status(200).json({ message: "Transaction deleted successfully" });
        } catch (error) {
            console.error("Error deleting transaction:", error);
            res.status(500).json({ message: "Internal server error" });
        };
    };
    async updateTransaction(req, res) {
        const { id } = req.params;
        const { amount, date, description, categoryId } = req.body;
        try {
            const transaction = await Transaction.findByPk(id);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }
            await transaction.update({ amount, date, description, categoryId });
            res.status(200).json({ message: "Transaction updated successfully" });
        } catch (error) {
            console.error("Error updating transaction:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    async getTransactionById(req, res) {
        const { id } = req.params;
        try {
            const transaction = await Transaction.findByPk(id);
            res.status(200).json(transaction);
        } catch (error) {
            console.error("Error fetching transaction:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
}

module.exports = new TransactionController();
