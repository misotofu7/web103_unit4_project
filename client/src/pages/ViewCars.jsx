// import React from 'react'
// import '../App.css'
// import { useState, useEffect } from 'react'

// const ViewCars = () => {
//     const [cars, setCars] = useState([])
    
//     useEffect(() => {
//         const fetchCars = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/car')

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch all cars')
//                 }

//                 const data = await response.json()
//                 setCars(data)
//             } catch (err) {
//                 console.log("Error in getting cars");
//             }
//         }

//         fetchCars()
//     }, [])

//     return (
//         <div>
//             {cars.map((car) => (
//                 <div key={car.id}>
//                     <h1>{car.exterior_id}</h1>
//                     <h1>{car.interior_id}</h1>
//                     <h1>{car.wheels_id}</h1>
//                     <h1>{car.roof_id}</h1>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default ViewCars

import React, { useState, useEffect } from 'react'
import '../App.css'

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
        setCars(data)
      } catch (err) {
        console.log('Error in getting cars:', err.message)
      }
    }

    fetchCars()
  }, [])

  return (
    <div>
      {cars.map((car) => (
        <div key={car.id}>
          <h1>Car #{car.id}</h1>

          <p>Exterior: {car.exterior}</p>
          <p>Interior: {car.interior}</p>
          <p>Wheels: {car.wheels}</p>
          <p>Roof: {car.roof}</p>

          <p>Total: ${car.exterior_price + car.interior_price + car.wheels_price + car.roof_price}</p>
        </div>
      ))}
    </div>
  )
}

export default ViewCars