import React, { useState } from 'react'
import './SignIn.css'

import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function SignIn() {
    // for storing FORM Data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // for error status
    const [error, setError] = useState(false)
    // for invalid credentials error status
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    // Navigation variable
    const navigate = useNavigate()

    // for handling form input
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    // for handling LOGIN through Server
    const handleLogin = () => {
        axios.post('http://localhost:4000/login', formData)
            .then((response) => {
                console.log(response)
                if (response.data.status === 'SUCCESS') {
                    setInvalidCredentials(false)
                    localStorage.setItem('token', response.data.jwToken)
                    localStorage.setItem('user', formData.email)
                    navigate('/dashboard')
                }
                else {
                    setInvalidCredentials(true)
                }
            })
            .catch((error) => { console.log(error) })
    }

    // for handling form Submission
    const handleSubmit = (e) => {
        e.preventDefault()
        const valid = Object.keys(formData).every(item => formData[item] !== '')
        if (valid) {
            // console.log(formData)
            setError(false)
            handleLogin()
        } else {
            setError(true)
        }
    }

    return (
        <div className='SignIn'>
            <h1>Sign In Page!</h1>
            <form onSubmit={handleSubmit} >
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
                <button type="submit" id='signInBtn' >Sign In</button>
                {
                    invalidCredentials && !error &&
                    <span className='errorMessage'>Invalid credentials !!!</span>
                }
            </form>
            <Link to='/signup'>Don't have account? Sign Up</Link>
        </div>
    )
}

export default SignIn