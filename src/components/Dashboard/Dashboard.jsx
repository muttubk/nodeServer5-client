import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    // for storing the status of whether user is PREMIUM
    const [premium, setPremium] = useState(true)

    // Navigation variable
    const navigate = useNavigate()

    // getting the Email of user stored in local storage
    const user = localStorage.getItem('user')
    // getting the JSON-WEB-TOKEN stored in local storage
    const token = localStorage.getItem('token')

    // for checking whether user logged in
    // If session is expired redirects to login page.
    useEffect(() => {
        axios.get('http://localhost:4000/dashboard', {
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

    // for handling navigation to PREMIUM Page
    const gotoPremium = () => {
        axios.get('http://localhost:4000/premium', {
            headers: {
                jwtoken: `${token}`,
            }
        })
            .then((response) => {
                console.log(response)
                if (response.data.status === 'SUCCESS') {
                    setPremium(true)
                    navigate('/premium')
                }
                else {
                    setPremium(false)
                }
            })
            .catch((error) => console.log(error))
    }

    // for handling Subscribing to Premium. (i.e. user subscribing)
    const handlePremiumSubscription = () => {
        const data = {
            isPremium: true,
            email: user
        }
        axios.patch('http://localhost:4000/subscribePremium', data)
            .then((response) => {
                console.log(response)
                setPremium(true)
            })
            .catch((error) => console.log(error))
    }

    const styles = {
        backgroundColor: 'coral',
        border: 'none',
        padding: '10px',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer'
    }

    return (
        <div style={{ textAlign: 'center', fontSize: '2rem', padding: '50px' }}>
            <h1>Welcome to Dashboard!</h1>
            <button style={styles} onClick={gotoPremium}>
                Access Premium content
            </button>
            {
                !premium &&
                <div style={{ backgroundColor: 'lightgrey', padding: '20px', marginTop: '20px' }}>
                    <h5>You're not a premium user!</h5>
                    <button
                        style={{ padding: '10px' }}
                        onClick={handlePremiumSubscription}
                    >
                        Click here to Subscribe
                    </button>
                </div>
            }
        </div>
    )
}

export default Dashboard