const { Budgue, Categorie, Transaction } = require('../models');

class BudgueController {
    async getBudgetsPage(req, res) {
        try {
            const budgets = await Budgue.findAll({
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            });

            const budgetsWithSpent = await Promise.all(budgets.map(async (budget) => {
                const transactions = await Transaction.findAll({
                    where: { categorie_id: budget.categorie_id }
                });
                
                const spent = transactions.reduce((sum, trans) => sum + trans.montant, 0);
                const limit = budget.budgue;
                
                let status = 'normal';
                let color = 'green';
                
                if (spent > limit) {
                    status = 'overspent';
                    color = 'red';
                } else if (spent > limit * 0.8) {
                    color = 'orange';
                }
                
                const iconMap = {
                    'Alimentation': '🛒',
                    'Transport': '🚗',
                    'Loisirs': '🎬',
                    'sport'    : '🏋️‍♂️',
                    'santé'    : '🏥',
                    'éducation': '📚',
                    'food'     : '🍔',
                    'autre'    : '💰'
                };
                
                return {
                    id: budget.id,
                    name: budget.name,
                    description: budget.description,
                    spent: spent,
                    limit: limit,
                    icon: iconMap[budget.categorie.name] || '💰',
                    color: color,
                    status: status,
                    categorie_name: budget.categorie.name
                };
            }));

            res.render('budgue', {
                title: "Budgets",
                budgets: budgetsWithSpent
            });
        } catch (error) {
            console.error('Budgets error:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getAllBudgues(req, res) {
        try {
            const budgues = await Budgue.findAll({
                where: { user_id: req.session.user.id },
                include: [{
                    model: Categorie,
                    as: 'categorie'
                }]
            });

            const budgetsWithSpent = await Promise.all(budgues.map(async (budget) => {
                const transactions = await Transaction.findAll({
                    where: { categorie_id: budget.categorie_id }
                });
                
                const spent = transactions.reduce((sum, trans) => sum + trans.montant, 0);
                const limit = budget.budgue;
                
                let status = 'normal';
                let color = 'green';
                
                if (spent > limit) {
                    status = 'overspent';
                    color = 'red';
                } else if (spent > limit * 0.8) {
                    color = 'orange';
                }
                
                const iconMap = {
                    'Alimentation': '🛒',
                    'Transport': '🚗',
                    'Loisirs': '🎬',
                    'sport'    : '🏋️♂️',
                    'santé'    : '🏥',
                    'éducation': '📚',
                    'food'     : '🍔',
                    'autre'    : '💰'
                };
                
                return {
                    id: budget.id,
                    name: budget.name,
                    description: budget.description,
                    spent: spent,
                    limit: limit,
                    icon: iconMap[budget.categorie.name] || '💰',
                    color: color,
                    status: status,
                    categorie_name: budget.categorie.name
                };
            }));

            res.render('budgue', {
                title: "Budgets",
                budgets: budgetsWithSpent
            });
        } catch (error) {
            console.error("Error fetching budgues:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getBudgueById(req, res) {
        const { id } = req.params;
        try {
            const budgue = await Budgue.findByPk(id);
            res.json(budgue);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createBudgue(req, res) {
        const { name, limit, description, categorie_id } = req.body;
        try {
            const budget = await Budgue.create({
                name: name,
                description: description,
                budgue: parseFloat(limit),
                categorie_id: parseInt(categorie_id)
            });
            res.json({ success: true, message: 'Budget ajouté avec succès', budget });
        } catch (error) {
            console.error('Error creating budget:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async updateBudgue(req, res) {
        const { id } = req.params;
        const { name, limit, description, categorie_id } = req.body;
        try {
            await Budgue.update({
                name: name,
                description: description,
                budgue: parseFloat(limit),
                categorie_id: parseInt(categorie_id)
            }, {
                where: { id }
            });
            res.json({ success: true, message: 'Budget modifié avec succès' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteBudgue(req, res) {
        const { id } = req.params;
        try {
            await Budgue.destroy({ where: { id } });
            res.json({ success: true, message: 'Budget supprimé avec succès' });
        } catch (error) {
            console.error('Error deleting budget:', error);
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = new BudgueController();