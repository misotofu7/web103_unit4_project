import React from 'react'
import '../App.css'
import { useState, useEffect } from 'react'
import '../css/ViewCars.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3000/car')

                if (!response.ok) {
                    throw new Error('Failed to fetch all cars')
                }

                const data = await response.json()

                // fetch data of each element (ex, in, ro, wh) per car
                const updatedCars = await Promise.all(
                    data.map(async (car) => {
                        const ex_response = await fetch(`http://localhost:3000/exterior/${car.exterior_id}`)
                        const in_response = await fetch(`http://localhost:3000/interior/${car.interior_id}`)
                        const ro_response = await fetch(`http://localhost:3000/roof/${car.roof_id}`)
                        const wh_response = await fetch(`http://localhost:3000/wheels/${car.wheels_id}`)

                        if (!ex_response.ok || !in_response.ok || !ro_response.ok || !wh_response.ok) {
                            throw new Error('Failed to fetch exterior, interior, roof, or wheels data of specific car')
                        }

                        const exterior = await ex_response.json()
                        const interior = await in_response.json()
                        const roof = await ro_response.json()
                        const wheels = await wh_response.json()

                        return {
                            ...car,
                            exterior,
                            interior,
                            roof,
                            wheels
                        }
                    })
                )

                setCars(updatedCars)
                console.log(updatedCars)
            } catch (err) {
                console.log("Error in getting cars");
            }
        }

        fetchCars()
    }, [])

    return (
        <div className="cars-container">
            {cars.map((car) => (
                <div className="car-card" key={car.id}>
                <h2>Car #{car.id}</h2>

                <div className="car-option">
                    <p>Exterior: {car.exterior.name}</p>
                    <img src={`/assets/${car.exterior.img}`} alt={car.exterior.name} />
                </div>

                <div className="car-option">
                    <p>Interior: {car.interior.name}</p>
                    <img src={`/assets/${car.interior.img}`} alt={car.interior.name} />
                </div>

                <div className="car-option">
                    <p>Wheels: {car.wheels.name}</p>
                    <img src={`/assets/${car.wheels.img}`} alt={car.wheels.name} />
                </div>

                <div className="car-option">
                    <p>Roof: {car.roof.name}</p>
                    <img src={`/assets/${car.roof.img}`} alt={car.roof.name} />
                </div>
                </div>
            ))}
        </div>
    )
}

export default ViewCars