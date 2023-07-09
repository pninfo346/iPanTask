/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import SingleLinkBreadcrumb from '../../Components/Breadcrumbs/SingleLinkBreadcrumb'
import TextInput from '../../Components/FormInputs/TextInput'
import Button from '../../Components/FormInputs/Button'
import { useParams } from 'react-router-dom'

const DepartmentEdit = () => {

    const { id } = useParams()

    var fields = {
        departmentName: '',
        categoryName: '',
        location: '',
        salary: '',
    }

    const [data, setData] =  useState(fields)
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

        await fetch(`http://localhost:5000/api/i-pangram/updateDepartment/${id}`,{
            method: 'POST',
            body: JSON.stringify(data),
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

    const getDepartment = async() => {
        await fetch(`http://localhost:5000/api/i-pangram/getDepartment/${id}`)
        .then((res) => res.json())
        .then((data)=>{
            // console.log(data.data);
            setData({
                departmentName: data.data.departmentName,
                categoryName: data.data.categoryName,
                location: data.data.location,
                salary: data.data.salary,
            })
        })
        .catch((err)=>{
            // console.log(err);
        })
    }

    useEffect(()=>{
        getDepartment()
    },[])

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <SingleLinkBreadcrumb 
                        pageName='Edit Department'
                        parent='Department'
                        url='/admin/departments'
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
                                <TextInput 
                                    title='Department Name'
                                    type='text'
                                    name='departmentName'
                                    placeholder='Enter Department Name'
                                    value={data?.departmentName}
                                    onChange={handleInput}
                                    required={true}
                                />
                                <TextInput 
                                    title='Category Name'
                                    type='text'
                                    name='categoryName'
                                    placeholder='Enter Category Name'
                                    value={data?.categoryName}
                                    onChange={handleInput}
                                    required={true}
                                />
                                <TextInput 
                                    title='Location'
                                    type='text'
                                    name='location'
                                    placeholder='Enter Location'
                                    value={data?.location}
                                    onChange={handleInput}
                                    required={true}
                                />
                                <TextInput 
                                    title='Salary'
                                    type='number'
                                    name='salary'
                                    placeholder='Enter Salary'
                                    value={data?.salary}
                                    onChange={handleInput}
                                    required={true}
                                />
                                <Button 
                                    type='submit'
                                    title='Update'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DepartmentEdit