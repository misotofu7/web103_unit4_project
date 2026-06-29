import React from 'react'
import '../App.css'
import { useState } from 'react'
// import { useNavigate } from 'react-router'
import '../css/CreateCar.css'

const CreateCar = () => {
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

    return (
        <div className="CreateCar">
            <center><h2>Add a Car</h2></center>

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
                        onClick={createCar}
                    />
                </form>
            </div>
        </div>
    )
}

export default CreateCar