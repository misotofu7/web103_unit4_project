import './dotenv.js'
import { pool } from './database.js'
import exteriorData from '../data/exteriorData.js'
import interiorData from '../data/interiorData.js'
import wheelsData from '../data/wheelsData.js'
import roofsData from '../data/roofsData.js'

const createCarTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;
        DROP TABLE IF EXISTS exteriors;
        DROP TABLE IF EXISTS interiors;
        DROP TABLE IF EXISTS wheels;
        DROP TABLE IF EXISTS roofs;

        CREATE TABLE IF NOT EXISTS exteriors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS interiors (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS wheels (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS roofs (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            exterior_id INT NOT NULL,
            interior_id INT NOT NULL,
            wheels_id INT NOT NULL,
            roof_id INT NOT NULL,

            FOREIGN KEY (exterior_id) REFERENCES exteriors(id),
            FOREIGN KEY (interior_id) REFERENCES interiors(id),
            FOREIGN KEY (wheels_id) REFERENCES wheels(id),
            FOREIGN KEY (roof_id) REFERENCES roofs(id)
        );
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    }
    catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}

const seedCarsTable = async () => {
    await createCarTable()

    exteriorData.forEach((exterior) => {
        const insertQuery = {
            text: 'INSERT INTO exteriors (name, price) VALUES ($1, $2)'
        }

        const values = [
            exterior.name,
            exterior.price,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting exterior', err)
                return
            }

            console.log(`✅ ${exterior.name} added successfully`)
        })
    })

    interiorData.forEach((interior) => {
        const insertQuery = {
            text: 'INSERT INTO interiors (name, price) VALUES ($1, $2)'
        }

        const values = [
            interior.name,
            interior.price,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting interior', err)
                return
            }

            console.log(`✅ ${interior.name} added successfully`)
        })
    })

    wheelsData.forEach((wheel) => {
        const insertQuery = {
            text: 'INSERT INTO wheels (name, price) VALUES ($1, $2)'
        }

        const values = [
            wheel.name,
            wheel.price,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting wheel', err)
                return
            }

            console.log(`✅ ${wheel.name} added successfully`)
        })
    })

    roofsData.forEach((roof) => {
        const insertQuery = {
            text: 'INSERT INTO roofs (name, price) VALUES ($1, $2)'
        }

        const values = [
            roof.name,
            roof.price,
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting roof', err)
                return
            }

            console.log(`✅ ${roof.name} added successfully`)
        })
    })
}

seedCarsTable()