import { pool } from '../config/database.js'

const getRoofs = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT * FROM roofs
      ORDER BY id ASC
    `)

    res.status(200).json(results.rows)
  } catch (err) {
    res.status(409).json({ err: err.message })
  }
}

export default {
  getRoofs
}