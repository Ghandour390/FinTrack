const { Categorie, Objectif_financies, Transaction, Budgue } = require('../models');
const { Op } = require('sequelize');

class DashboardController {
  async getDashboard(req, res) {
    try {
      const user = req.session.user;
      if (!user) {
        return res.redirect('/users/login');
      }

      const categories = await Categorie.findAll({
        where: { user_id: user.id },
        include: [
          {
            model: Transaction,
            as: 'transactions',
          },
          {
            model: Budgue,
            as: 'budgues',
          },
        ],
      });

      if (!categories) {
        return res.status(404).json({ message: "Categories not found" });
      }

      const objectifs = await Objectif_financies.findAll({
        where: { user_id: user.id },
      });

      // Calculate expenses by category
      const categoryNames = categories.map(cat => cat.name);
      const categoryData = categories.map(cat => {
        return cat.transactions.reduce((sum, trans) => sum + trans.montant, 0);
      });
      
      // Calculate totals
      const totalExpenses = categoryData.reduce((sum, amount) => sum + amount, 0);
      
      // Calculate income dynamically
      const income = await Transaction.sum('montant', {
        where: { 
          user_id: user.id,
          type: 'revenu'
        }
      }) || 0;
      
      // Calculate savings goal dynamically
      const totalSavingsCurrent = objectifs.reduce((sum, obj) => sum + (obj.montant_actual || 0), 0);
      const totalSavingsTarget = objectifs.reduce((sum, obj) => sum + (obj.montant_acible || 0), 0);
      const savingsGoal = { 
        current: totalSavingsCurrent, 
        target: totalSavingsTarget || 10000 
      };
      
      // Calculate trends for last 7 days
      const trends = [];
      const trendLabels = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);
        
        const dayExpenses = await Transaction.sum('montant', {
          where: {
            user_id: user.id,
            type: 'depense',
            date: {
              [Op.between]: [dayStart, dayEnd]
            }
          }
        });
        
        trends.push(dayExpenses || 0);
        trendLabels.push(
          date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
        );
      }
      
      res.render('dashboard', {
        user: user,
        title: "Dashboard",
        categories: categories,
        objectifs: objectifs,
        income: income,
        expenses: totalExpenses,
        savingsGoal: savingsGoal,
        categoryNames: categoryNames,
        categoryData: categoryData,
        trends: trends,
        trendLabels: trendLabels
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new DashboardController();
