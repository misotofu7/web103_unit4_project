import React from 'react'
import '../App.css'
import { useState, useEffect } from 'react'

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
        <div>
            {cars.map((car) => (
                <div key={car.id}>
                    <h2>Car #{car.id}</h2>
                    <p>Exterior: {car.exterior.name}</p>
                    <img src={`/assets/${car.exterior.img}`} alt={car.exterior.name} />

                    <p>Interior: {car.interior.name}</p>
                    <img src={`/assets/${car.interior.img}`} alt={car.interior.name} />

                    <p>Wheels: {car.wheels.name}</p>
                    <img src={`/assets/${car.wheels.img}`} alt={car.wheels.name} />

                    <p>Roof: {car.roof.name}</p>
                    <img src={`/assets/${car.roof.img}`} alt={car.roof.name} />
                </div>
            ))}

            <img src='/assets/yellow.png' />
        </div>
    )
}

export default ViewCars