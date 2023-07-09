/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextInput from '../Components/FormInputs/TextInput'
import Button from '../Components/FormInputs/Button'

const SignUp = () => {

    const navigate = useNavigate()

    var fields = {
        name: '',
        userName: '',
        phone: '',
        gender: '',
        hobbies: '',
        email: '',
        password: '',
        conPassword: '',
        city: '',
        state: '',
        country: '',
        role: 'manager',
        departmentId: '',
        departmentName: '',
        location: '',
    }

    const [showResponse, setShowResponse] = useState(false)
    const [messageText, setMessageText] = useState()
    const [data, setData] = useState(fields)
    const [hobbies, setHobbies] = useState([]);

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    function handleHobbyChange(event) {
        const { value, checked } = event.target;
      
        setHobbies(prevHobbies => {
            if (checked) {
                // Add the hobby to the state if it's checked
                return [...prevHobbies, value];
            } else {
                // Remove the hobby from the state if it's unchecked
                return prevHobbies.filter(hobby => hobby !== value);
            }
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        // console.log(hobbies);

        const formData = {
            name: data.name,
            userName: data.userName,
            phone: data.phone,
            gender: data.gender,
            email: data.email,
            password: data.password,
            conPassword: data.conPassword,
            city: data.city,
            state: data.state,
            country: data.country,
            role: 'manager',
            departmentId: data.departmentId,
            departmentName: data.departmentName,
            location: data.location,
            hobbies: hobbies,
        };

        await fetch('http://localhost:5000/api/i-pangram/register',{
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data) => {
            setShowResponse(true)
            setMessageText(data.message)
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
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
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
                                <h3 className='text-center'>Sign Up</h3>
                                <form onSubmit={handleSubmit}>
                                    <input type="hidden" name='role' value='manager' />
                                    <input type="hidden" name='departmentId' value='' />
                                    <input type="hidden" name='departmentName' value='' />
                                    <input type="hidden" name='location' value='' />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <TextInput 
                                                title='Name'
                                                type='text'
                                                name='name'
                                                placeholder='Jonh Doe'
                                                value={data?.name}
                                                onChange={handleInput}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput 
                                                title='Username'
                                                type='text'
                                                name='userName'
                                                placeholder='JonhDoe123'
                                                value={data?.userName}
                                                onChange={handleInput}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput 
                                                title='Phone'
                                                type='phone'
                                                name='phone'
                                                placeholder='+1-4587215635'
                                                value={data?.phone}
                                                onChange={handleInput}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput 
                                                title='Email'
                                                type='text'
                                                name='email'
                                                placeholder='jonhdoe@example.com'
                                                value={data?.email}
                                                onChange={handleInput}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="gender">Gender <span className='text-danger fw-bold'>*</span></label><br />
                                            <input type="radio" className='form-check-input' name='gender' value='Male' onChange={handleInput} /> Male&nbsp;&nbsp;&nbsp;
                                            <input type="radio" className='form-check-input' name='gender' value='Female' onChange={handleInput} /> Female
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="hobbies">Hobbies <span className='text-danger fw-bold'>*</span></label><br />
                                            <div className='d-flex flex-wrap'>
                                                <div>
                                                    <input type="checkbox" name='hobbies' value='Cricket' onChange={handleHobbyChange} /> Cricket&nbsp;&nbsp;&nbsp;
                                                </div>
                                                <div>
                                                    <input type="checkbox" name='hobbies' value='Chess' onChange={handleHobbyChange} /> Chess&nbsp;&nbsp;&nbsp;
                                                </div>
                                                <div>
                                                    <input type="checkbox" name='hobbies' value='Travelling' onChange={handleHobbyChange} /> Travelling&nbsp;&nbsp;&nbsp;
                                                </div>
                                                <div>
                                                    <input type="checkbox" name='hobbies' value='Shopping' onChange={handleHobbyChange} /> Shopping&nbsp;&nbsp;&nbsp;
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput 
                                                title='Password'
                                                type='password'
                                                name='password'
                                                placeholder='Example Password'
                                                value={data?.password}
                                                onChange={handleInput}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput 
                                                title='Confirm Password'
                                                type='password'
                                                name='conPassword'
                                                placeholder='Example Confirm Password'
                                                value={data?.conPassword}
                                                onChange={handleInput}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <TextInput 
                                                title='City'
                                                type='text'
                                                name='city'
                                                placeholder='Example city'
                                                value={data?.city}
                                                onChange={handleInput}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <TextInput 
                                                title='State'
                                                type='text'
                                                name='state'
                                                placeholder='Example state'
                                                value={data?.state}
                                                onChange={handleInput}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <TextInput 
                                                title='Country'
                                                type='text'
                                                name='country'
                                                placeholder='Example country'
                                                value={data?.country}
                                                onChange={handleInput}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                    <Button 
                                        type='submit'
                                        title='Sign up'
                                    />
                                </form>
                                <br />
                                <span>Already have account? <Link to='/' className='text-decoration-none'>Click here</Link> to Sign in</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}

export default SignUp