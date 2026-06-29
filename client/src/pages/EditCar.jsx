import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import '../css/EditCar.css'

const EditCar = () => {
    const { id } = useParams()
    const [car, setCar] = useState({
        id: 0,
        exterior: '',
        interior: '',
        wheels: '',
        roof: ''
    })

    useEffect(() => {
        const fetchCarById = async () => {
            const response = await fetch(`/car/${id}`)
            const data = await response.json()
            setGift(data)
        }

        fetchCarById()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target

        setCar((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const updateCar = (event) => {
        event.preventDefault()

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }

        const response = fetch(`/car/${id}`, options)
        window.location = '/'
    }

    const deleteCar = (event) => {
        event.preventDefault()

        const options = {
            method: 'DELETE'
        }

        const response = fetch(`/car/${id}`, options)
        window.location = '/'
    }

    return (
        <div className="EditCar">
            <center><h2>Edit a Car</h2></center>

            <div>
                <form>
                    <label htmlFor="exterior">Exterior</label> <br />
                    <input
                        type="text"
                        id="exterior"
                        name="exterior"
                        onChange={handleChange}
                    />
                    <br/>
                    <br/>

                    <label htmlFor="interior">Interior</label><br />
                    <input
                        type="text"
                        id="interior"
                        name="interior"
                        onChange={handleChange}
                    />
                    <br/>
                    <br/>

                    <label htmlFor="wheels">Wheels</label><br />
                    <input
                        type="text"
                        id="wheels"
                        name="wheels"
                        onChange={handleChange}>
                    </input>
                    <br/>
                    <br/>

                    <label htmlFor="roof">Roof</label><br />
                    <input
                        type="text"
                        id="roof"
                        name="roof"
                        onChange={handleChange}>
                    </input>
                    <br/>
                    <br/>

                    <input
                        type="submit"
                        value="Submit"
                        onClick={updateCar}
                    />
                </form>
            </div>
        </div>
    )
}

export default EditCar