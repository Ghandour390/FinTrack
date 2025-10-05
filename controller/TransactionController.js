// removed unused import
const { Transaction, Categorie, User } = require("../models");


class TransactionController {
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.findAll({
        include: [{ model: Categorie, as: 'categorie' }],
        order: [['date', 'DESC']]
      });
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Internal server error" });   
    }
  };
async getAllTransactionsUserAuth(req, res) {
    try {
      const userId = req.session.user.id;
      const transactions = await Transaction.findAll({
        where: { user_id: userId },
        include: [{
          model: Categorie,
          as: 'categorie',
          include: [{
            model: User,
            as: 'user'
          }]
        }],
        order: [['date', 'DESC']]
      });
   console.log(transactions);
      const categories = await Categorie.findAll({
        where: { user_id: req.session.user.id }
      });
       res.render('transaction', {
      title: "Transactions",
      transactions,
      categories
    });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
    // Create a new transaction
    async createTransaction(req, res) {
        try {
            console.log('POST /api/transactions headers:', req.headers['content-type']);
            console.log('POST /api/transactions body:', req.body);
            // Support both frontend field names and DB field names
            const {
              montant,
              amount,
              date,
              description,
              categorie_id,
              categoryId,
              type
            } = req.body;

            const resolvedMontant = montant ?? amount;
            const resolvedCategorieId = categorie_id ?? categoryId;

            if (!resolvedMontant || !resolvedCategorieId || !date || !type) {
              return res.status(400).json({
                message: "Champs requis manquants: montant, categorie_id, date, type",
                received: { montant: resolvedMontant, categorie_id: resolvedCategorieId, date, type }
              });
            }

            if (!req.session || !req.session.user || !req.session.user.id) {
              return res.status(401).json({ message: "Utilisateur non authentifié" });
            }

            const userId = req.session.user.id;

            const newTransaction = await Transaction.create({
              montant: resolvedMontant,
              date,
              description,
              user_id: userId,
              categorie_id: resolvedCategorieId,
              type
            });

            return res.status(201).json(newTransaction);
        } catch (error) {
            console.error("Error creating transaction:", error);
            return res.status(500).json({ message: "Internal server error" });
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
        try {
            const {
              montant,
              amount,
              date,
              description,
              categorie_id,
              categoryId,
              type
            } = req.body;

            const resolvedMontant = montant ?? amount;
            const resolvedCategorieId = categorie_id ?? categoryId;

            const transaction = await Transaction.findByPk(id);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }

            await transaction.update({
              montant: resolvedMontant ?? transaction.montant,
              date: date ?? transaction.date,
              description: description ?? transaction.description,
              categorie_id: resolvedCategorieId ?? transaction.categorie_id,
              type: type ?? transaction.type
            });
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
