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
                setCars(data)
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
                    <h1>Car #{car.id}</h1>

                    <p>Exterior: {car.exterior_id}</p>
                    <p>Interior: {car.interior_id}</p>
                    <p>Wheels: {car.wheels_id}</p>
                    <p>Roof: {car.roof_id}</p>

                    {/* <p>Total: ${car.exterior_price + car.interior_price + car.wheels_price + car.roof_price}</p> */}

                    {/* <Link to={`/edit/${car.id}`}>
                        <button type="button">Edit</button>
                    </Link>
                    <button>Delete</button> */}
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