const objectif_financies = require("../models")

class ObjectifFinanciesController {
    static async createObjectifFinancies(req, res) {
        try {
            const { objectif_financies_name, objectif_financies_description, objectif_financies_amount, objectif_financies_date, objectif_financies_status } = req.body
            const objectif_financies = await objectif_financies.create({ objectif_financies_name, objectif_financies_description, objectif_financies_amount, objectif_financies_date, objectif_financies_status })
            res.status(201).json(objectif_financies)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async getAllObjectifFinancies(req, res) {
        try {
            const objectif_financies = await objectif_financies.findAll()
            res.status(200).json(objectif_financies)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async getObjectifFinanciesById(req, res) {
        try {
            const { id } = req.params
            const objectif_financies = await objectif_financies.findByPk(id)
            res.status(200).json(objectif_financies)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async updateObjectifFinancies(req, res) {
        try {
            const { id } = req.params
            const { objectif_financies_name, objectif_financies_description, objectif_financies_amount, objectif_financies_date, objectif_financies_status } = req.body
            const objectif_financies = await objectif_financies.update({ objectif_financies_name, objectif_financies_description, objectif_financies_amount, objectif_financies_date, objectif_financies_status }, { where: { id } })
            res.status(200).json(objectif_financies)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async deleteObjectifFinancies(req, res) {
        try {
            const { id } = req.params
            const objectif_financies = await objectif_financies.destroy({ where: { id } })
            res.status(200).json(objectif_financies)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
};
module.exports = ObjectifFinanciesController;