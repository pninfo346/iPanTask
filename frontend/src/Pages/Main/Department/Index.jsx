/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BasicBreadcrumb from '../../Components/Breadcrumbs/BasicBreadcrumb'
import DepartmentTable from './Table'
import TextInput from '../../Components/FormInputs/TextInput'
import Button from '../../Components/FormInputs/Button'

const DepartmentIndex = () => {

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <BasicBreadcrumb 
                        pageName='Department'
                    />
                </div>
                <Link to='/admin/add-department' className='btn btn-sm btn-custom'><i className="fa-solid fa-plus"></i> Add New</Link>
            </div>
            
            <div className='bg-theme p-20px'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <DepartmentTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DepartmentIndex