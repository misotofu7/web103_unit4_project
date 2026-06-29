import React from 'react'
import '../App.css'
import { useState } from 'react'
// import { useNavigate } from 'react-router'
// css styling?

const CreateCar = () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    }

    const response = fetch('/cars', options)
    window.location = '/'

    return (
        <div className="create">
            <h1>Create your custom car</h1>

            <div>
                <form>
                    <label htmlFor="exterior">Exterior</label> <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                    />
                    <br/>
                    <br/>

                    <label htmlFor="color">Interior</label><br />
                    <input
                        type="text"
                        id="color"
                        name="color"
                        onChange={handleChange}
                    />
                    <br/>
                    <br/>

                    <label htmlFor="accessory">Wheels</label><br />
                    <input
                        type="text"
                        id="accessory"
                        name="accessory"
                        onChange={handleChange}>
                    </input>
                    <br/>
                    <br/>

                    <label htmlFor="accessory">Roof</label><br />
                    <input
                        type="text"
                        id="accessory"
                        name="accessory"
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