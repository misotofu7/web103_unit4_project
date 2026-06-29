import { pool } from '../config/database.js'

const getCars = async (req, res) => {
    try {
        const results = await pool.query(`
            SELECT * FROM cars
        `)
        res.status(200).json(results.rows[0])
    }
    catch (err) {
        res.status(409).json( { err: err.message } )
    }
}

const getCarById = async (req, res) => {
    try {
        const { carId } = req.params
        const results = await pool.query(
            `
            SELECT *
            FROM cars
            WHERE carId = $1
            `,
            [carId]
        )
        res.status(200).json(results.rows[0])
    }
    catch (err) {
        res.status(409).json( { err: err.message } )
    }
}

const createCar = async (req, res) => {
    try {
        const { exterior, interior, wheels, roof } = req.body
        const results = await pool.query(`
            INSERT INTO cars (exterior, interior, wheels, roof)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [exterior, interior, wheels, roof]
        )
        res.status(200).json(results.rows[0])
    }
    catch (err) {
        res.status(409).json( { err: err.message } )
    }
}

const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { exterior, interior, wheels, roof } = req.body
        const results = await pool.query(`
            UPDATE cars
            SET exterior = $1, interior = $2, wheels = $3, roof = $4
            WHERE id = $5`,
            [exterior, interior, wheels, roof, id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (err) {
        res.status(409).json( { err: err.message } )
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query(
            'DELETE FROM cars WHERE id = $1',
            [id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (err) {
        res.status(409).json( { err: err.message } )
    }
}

export default {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}