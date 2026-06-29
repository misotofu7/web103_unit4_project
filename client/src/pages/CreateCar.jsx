import React, { useEffect } from 'react'
import '../App.css'
import { useState } from 'react'
// import { useNavigate } from 'react-router'
import '../css/CreateCar.css'

const CreateCar = () => {
    const [exteriors, setExteriors] = useState([])

    const [car, setCar] = useState({
        id: 0,
        exterior: '',
        interior: '',
        wheels: '',
        roof: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setCar( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createCar = (event) => {
        event.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }

        const response = fetch('/car', options)
        window.location = '/'
    }

    useEffect(() => {
        const fetchExteriors = async () => {
        try {
            const response = await fetch('http://localhost:3000/exterior')

            if (!response.ok) {
            throw new Error('Failed to fetch exteriors')
            }

            const data = await response.json()
            setExteriors(data)
        } catch (err) {
            console.log("Error in getting exteriors");
        }
        }

        fetchExteriors()
    }, [])


    return (
        <div className="CreateCar">
            <center><h2>Add a Car</h2></center>

            <div>
                <form>
                    <details className="dropdown">
                        <summary>Exteriors</summary>

                        {exteriors.map((exterior) => (
                            <label key={exterior.id} htmlFor={`exterior-${exterior.id}`}>
                            <input
                                id={`exterior-${exterior.id}`}
                                type="radio"
                                name="exterior"
                                value={exterior.id}
                            />
                            {exterior.name}
                            </label>
                        ))}
                    </details>
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
                        onClick={createCar}
                    />
                </form>
            </div>
        </div>
    )
}

export default CreateCar