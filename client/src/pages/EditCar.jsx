import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import '../css/EditCar.css'

const EditCar = () => {
    const { id } = useParams()
    const [car, setCar] = useState({
        id: 0,
        exterior_id: '',
        interior_id: '',
        wheels_id: '',
        roof_id: ''
    })

    useEffect(() => {
        const fetchCarById = async () => {
            const response = await fetch(`http://localhost:3000/car/${id}`)
            const data = await response.json()
            setCar(data)
        }

        fetchCarById()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target

        setCar((prev) => ({
            ...prev,
            [name]: Number(value)
        }))
    }
    
    const updateCar = async (event) => {
        event.preventDefault()

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }

        const response = await fetch(`http://localhost:3000/car/${id}`, options)

        if (response.ok) {
            window.location = '/'
        } else {
            console.log('Error updating car')
        }
    }

    const deleteCar = async (event) => {
        event.preventDefault()

        const options = {
            method: 'DELETE'
        }

        const response = await fetch(`http://localhost:3000/car/${id}`, options)

        if (response.ok) {
            window.location = '/'
        } else {
            console.log('Error deleting car')
        }
    }

    return (
        <div className="EditCar">
            <center><h2>Edit a Car</h2></center>

            <div>
                <form onSubmit={updateCar}>
                    <details className="dropdown">
                        <summary>Exteriors</summary>

                        {exteriors.map((exterior) => (
                            <label key={exterior.id} htmlFor={`exterior-${exterior.id}`}>
                            <input
                                id={`exterior-${exterior.id}`}
                                type="radio"
                                name="exterior_id"
                                value={exterior.id}
                                checked={Number(car.exterior_id) === exterior.id}
                                onChange={handleChange}
                            />
                            {exterior.name}
                            {exterior.img}
                            </label>
                        ))}
                    </details>
                    <br/>
                    <br/>

                    <details className="dropdown">
                        <summary>Interiors</summary>

                        {interiors.map((interior) => (
                            <label key={interior.id} htmlFor={`interior-${interior.id}`}>
                            <input
                                id={`interior-${interior.id}`}
                                type="radio"
                                name="interior_id"
                                value={interior.id}
                                checked={Number(car.interior_id) === interior.id}
                                onChange={handleChange}
                            />
                            {interior.name}
                            {interior.name}
                            </label>
                        ))}
                    </details>
                    <br/>
                    <br/>

                    <details className="dropdown">
                        <summary>Wheels</summary>

                        {wheels.map((wheel) => (
                            <label key={wheel.id} htmlFor={`wheel-${wheel.id}`}>
                            <input
                                id={`wheel-${wheel.id}`}
                                type="radio"
                                name="wheel_id"
                                value={wheel.id}
                                checked={Number(car.wheel_id) === wheel.id}
                                onChange={handleChange}
                            />
                            {wheel.name}
                            {wheel.name}
                            </label>
                        ))}
                    </details>
                    <br/>
                    <br/>

                    <details className="dropdown">
                        <summary>Roofs</summary>

                        {roofs.map((roof) => (
                            <label key={roof.id} htmlFor={`roof-${roof.id}`}>
                            <input
                                id={`roof-${roof.id}`}
                                type="radio"
                                name="roof_id"
                                value={roof.id}
                                checked={Number(car.roof_id) === roof.id}
                                onChange={handleChange}
                            />
                            {roof.name}
                            {roof.name}
                            </label>
                        ))}
                    </details>
                    <br/>
                    <br/>

                    <Link to={`/edit/${car.id}`}>
                        <button type="button">Edit</button>
                    </Link>
                    <button type="button" onClick={() => deleteCar(car.id)}>
                        Delete
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditCar