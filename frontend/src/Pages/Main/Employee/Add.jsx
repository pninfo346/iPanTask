/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import SingleLinkBreadcrumb from '../../Components/Breadcrumbs/SingleLinkBreadcrumb'
import TextInput from '../../Components/FormInputs/TextInput'
import Button from '../../Components/FormInputs/Button'

const EmployeeAdd = () => {
   
    var fields = {
        name: '',
        userName: '',
        phone: '',
        email: '',
        gender: '',
        hobbies: '',
        password: '',
        conPassword: '',
        city: '',
        state: '',
        country: '',
        role: 'employee',
        departmentId: '',
        location: '',
    }

    const [data, setData] =  useState(fields)
    const [hobbies, setHobbies] = useState([]);
    const [departments, setDepartments] =  useState([])
    const [showResponse, setShowResponse] = useState(false)
    const [messageText, setMessageText] = useState()

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
            role: 'employee',
            departmentId: data.departmentId,
            departmentName: data.departmentName,
            location: data.location,
            hobbies: hobbies,
        };

        await fetch(`http://localhost:5000/api/i-pangram/storeEmployee`,{
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
        
        setData({
            name: '',
            userName: '',
            phone: '',
            email: '',
            gender: '',
            hobbies: [],
            password: '',
            conPassword: '',
            city: '',
            state: '',
            country: '',
            role: '',
            departmentId: '',
            location: '',
        })
    }

    const getAllDepartments = async() => {
        await fetch('http://localhost:5000/api/i-pangram/getAllDepartments')
        .then((res) => res.json())
        .then((data)=>{
            setDepartments(data.data)
        })
        .catch((err)=>{
            // console.log(err);
        })
    }

    useEffect(()=>{
        getAllDepartments()
    },[])

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <SingleLinkBreadcrumb 
                        pageName='Add Employee'
                        parent='Employee'
                        url='/admin/employees'
                    />
                </div>
            </div>
            
            <div className='bg-theme p-20px'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 bg-white rounded p-3">
                            <form onSubmit={handleSubmit}>
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
                                <small>Fields with <span className='text-danger fw-bold'>*</span> are mandatory !</small>
                                <br /><br />
                                <input type="hidden" name='role' value='employee' />
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextInput 
                                            title='Name'
                                            type='text'
                                            name='name'
                                            placeholder='Enter Name'
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
                                            placeholder='Enter Username'
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
                                            placeholder='Enter Phone'
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
                                            placeholder='Enter Email'
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
                                            placeholder='Enter Password'
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
                                            placeholder='Enter Password'
                                            value={data?.conPassword}
                                            onChange={handleInput}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="departmentId">Department <span className='text-danger fw-bold'>*</span></label>
                                        <select name="departmentId" id="departmentId" className='form-select' value={data?.departmentId} onChange={handleInput} required>
                                            <option value="">---- Select Department ----</option>
                                            {
                                                departments && departments.map((val,key)=>(
                                                    <>
                                                        <option key={key} value={val?._id}>{val?.departmentName}</option>
                                                    </>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput 
                                            title='Location'
                                            type='text'
                                            name='location'
                                            placeholder='Enter location'
                                            value={data?.location}
                                            onChange={handleInput}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <TextInput 
                                            title='City'
                                            type='text'
                                            name='city'
                                            placeholder='Enter city'
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
                                            placeholder='Enter state'
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
                                            placeholder='Enter country'
                                            value={data?.country}
                                            onChange={handleInput}
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <Button 
                                    type='submit'
                                    title='Save'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeAdd