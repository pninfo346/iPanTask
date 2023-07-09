/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import BasicBreadcrumb from '../../Components/Breadcrumbs/BasicBreadcrumb'
import EmployeeTable from './Table'

const EmployeeIndex = () => {

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <BasicBreadcrumb 
                        pageName='Employee'
                    />
                </div>
                <Link to='/admin/add-employee' className='btn btn-sm btn-custom'><i className="fa-solid fa-plus"></i> Add New</Link>
            </div>
            
            <div className='bg-theme p-20px'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <EmployeeTable />
                            <br />
                            <br />
                            <h5>More Options:</h5>
                            <Link to='/admin/employees-from-it-department-and-location-from-A' className='text-theme fw-bold text-decoration-none'>1. Click here to see Employees from IT Department & from Location starts with A.</Link><br />
                            <Link to='/admin/employees-from-sales-department-in-reverse-order' className='text-theme fw-bold text-decoration-none'>2. Click here to see Employees from Sales Department in Reverse Order.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeIndex