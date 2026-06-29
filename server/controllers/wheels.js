import { pool } from '../config/database.js'

const getWheels = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT * FROM wheels
      ORDER BY id ASC
    `)

    res.status(200).json(results.rows)
  } catch (err) {
    res.status(409).json({ err: err.message })
  }
}

export default {
  getWheels
}