import React from 'react'
import '../App.css'

const EditCar = () => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    }

    const response = fetch(`/cars/${id}`, options)
    window.location = '/'

    // where to put delete???

    return (
        <div>

        </div>
    )
}

export default EditCar