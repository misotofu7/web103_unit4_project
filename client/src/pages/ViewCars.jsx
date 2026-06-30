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
                    <p>Interior: {car.interior.name}</p>
                    <p>Wheels: {car.wheels.name}</p>
                    <p>Roof: {car.roof.name}</p>
                </div>
            ))}
        </div>
    )
}

export default ViewCars

// import React, { useState, useEffect } from 'react'
// import '../App.css'
// import { Link } from 'react-router-dom'

// const ViewCars = () => {
//   const [cars, setCars] = useState([])

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/car')

//         if (!response.ok) {
//           throw new Error('Failed to fetch all cars')
//         }

//         const data = await response.json()
//         setCars(data)
//       } catch (err) {
//         console.log('Error in getting cars:', err.message)
//       }
//     }

//     fetchCars()
//   }, [])

//   return (
//     <div>
//       {cars.map((car) => (
//         <div key={car.id}>
//           <h1>Car #{car.id}</h1>

//           <p>Exterior: {car.exterior}</p>
//           <p>Interior: {car.interior}</p>
//           <p>Wheels: {car.wheels}</p>
//           <p>Roof: {car.roof}</p>

//           <p>Total: ${car.exterior_price + car.interior_price + car.wheels_price + car.roof_price}</p>

//           <Link to={`/edit/${car.id}`}>
//             <button type="button">Edit</button>
//           </Link>
//           <button>Delete</button>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ViewCars