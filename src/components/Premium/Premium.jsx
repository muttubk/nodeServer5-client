import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Premium() {
    // Navigation variable
    const navigate = useNavigate()

    // getting the JSON-WEB-TOKEN stored in local storage
    const token = localStorage.getItem('token')

    // for checking whether user logged in
    // If session is expired redirects to login page.
    useEffect(() => {
        axios.get('http://localhost:4000/premium', {
            headers: {
                jwtoken: `${token}`,
            }
        })
            .then((response) => {
                if (response.data.status === 'SUCCESS') {
                    console.log(response.data)
                }
                else {
                    navigate('/')
                }
            })
            .catch((error) => console.log(error))
    })
    
    return (
        <div style={{ textAlign: 'center', fontSize: '2rem', padding: '50px' }}>
            <h1> Welcome to premium page!</h1>
        </div>
    )
}

export default Premium