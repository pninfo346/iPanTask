/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextInput from '../Components/FormInputs/TextInput'
import Button from '../Components/FormInputs/Button'

const SignIn = () => {

    const navigate = useNavigate()

    var fields = {
        email: '',
        password: '',
    }

    const [data, setData] = useState(fields)
    const [showResponse, setShowResponse] = useState(false)
    const [messageText, setMessageText] = useState()

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        // console.log(data);
        await fetch('http://localhost:5000/api/i-pangram/login',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data) => {
            // console.log(data.status);
            if (data.status == 'success') {
                localStorage.setItem('token', data.token)
                localStorage.setItem('loggedInUserDepartment', data.user.departmentName)
                localStorage.setItem('loggedInUserRole', data.user.role)
                localStorage.setItem('loggedInUserID', data.user._id)
                localStorage.setItem('loggedInUserEmail', data.user.email)
                localStorage.setItem('loggedInUserName', data.user.name)

                if (localStorage.getItem('loggedInUserRole') == 'manager') {
                    navigate(`/admin/dashboard`)
                } else {
                    navigate(`/admin/employee-dashboard`)
                }
            } else {
                setShowResponse(true)
                setMessageText(data.message)
            }
        }) 
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token != null) {
            navigate('/admin/dashboard')
        }
    },[])

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className='guestFormsParent'>
                            <div className='guestFormsChild'>
                                {
                                    showResponse ?
                                    <>
                                        <div className="alert alert-theme" role="alert">
                                            {messageText}
                                        </div>
                                    </>
                                    :
                                    ''
                                }
                                <h3 className='text-center'>Sign In</h3>
                                <form onSubmit={handleSubmit}>
                                    <TextInput 
                                        title='Email'
                                        type='text'
                                        name='email'
                                        placeholder='jonhdoe@example.com'
                                        value={data?.email}
                                        onChange={handleInput}
                                        required={true}
                                    />
                                    <TextInput 
                                        title='Password'
                                        type='password'
                                        name='password'
                                        placeholder='ExamplePassword'
                                        value={data?.password}
                                        onChange={handleInput}
                                        required={true}
                                    />
                                    <Button 
                                        type='submit'
                                        title='Sign in'
                                    />
                                </form>
                                <br />
                                <span>Do not have account? <Link to='/sign-up' className='text-decoration-none'>Click here</Link> to Sign up</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    )
}

export default SignIn