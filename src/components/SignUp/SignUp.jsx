import React, { useState } from 'react'
import './SignUp.css'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
    // for storing FORM DATA
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: ''
    })

    // for error handling
    const [error, setError] = useState(false)

    // navigation variable
    const navigate = useNavigate()

    // for handling input field change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    // for sending form data to SERVER
    const sendData = () => {
        axios.post('http://localhost:4000/signup', formData)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }

    // for handling form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        const valid = Object.keys(formData).every(item => formData[item] !== '')
        if (valid) {
            // console.log(formData)
            setError(false)
            sendData()
            navigate('/')
        } else {
            setError(true)
        }
    }

    return (
        <div className='SignUp'>
            <h1>Welcome to Sign Up Page!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Full Name</label>
                    <input type='text' id='name' name='fullname' placeholder='Enter full name'
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                    {
                        error && formData.fullname === '' &&
                        <span className='errorMessage'>* Required</span>
                    }
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id='email' name='email' placeholder='Enter email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {
                        error && formData.email === '' &&
                        <span className='errorMessage'>* Required</span>
                    }
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" id='password' name='password' placeholder='Enter password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {
                        error && formData.password === '' &&
                        <span className='errorMessage'>* Required</span>
                    }
                </div>
                <button type="submit" id='signupBtn' >Sign Up</button>
            </form>
            <Link to='/'>Already have an account? Log In</Link>
        </div>
    )
}

export default SignUp