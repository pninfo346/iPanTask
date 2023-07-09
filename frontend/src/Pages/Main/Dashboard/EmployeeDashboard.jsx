/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BasicBreadcrumb from '../../Components/Breadcrumbs/BasicBreadcrumb'

const EmployeeDashboardIndex = () => {

    const [name, setName] = useState()
    const [role, setRole] = useState()
    const [userID, setUserID] = useState()
    const [email, setEmail] = useState()
    const [department, setDepartment] = useState()

    useEffect(()=>{
        setDepartment(localStorage.getItem('loggedInUserDepartment'))
        setName(localStorage.getItem('loggedInUserName'))
        setRole(localStorage.getItem('loggedInUserRole'))
        setUserID(localStorage.getItem('loggedInUserID'))
        setEmail(localStorage.getItem('loggedInUserEmail'))
    },[])

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <BasicBreadcrumb 
                        pageName='Dashboard'
                    />
                </div>
            </div>
            
            <div className='bg-theme p-20px'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='guestFormsChild'>
                                <center><h3>Your Details</h3></center>
                                <div className='d-flex justify-content-around align-items-center'>
                                    <h5>Name</h5>
                                    <p>{name}</p>
                                </div>
                                <div className='d-flex justify-content-around align-items-center'>
                                    <h5>Role</h5>
                                    <p>{role}</p>
                                </div>
                                <div className='d-flex justify-content-around align-items-center'>
                                    <h5>Email</h5>
                                    <p>{email}</p>
                                </div>
                                <div className='d-flex justify-content-around align-items-center'>
                                    <h5>Department</h5>
                                    <p>{department}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeDashboardIndex