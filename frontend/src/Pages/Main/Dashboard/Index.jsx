/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BasicBreadcrumb from '../../Components/Breadcrumbs/BasicBreadcrumb'

const DashboardIndex = () => {

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
                        <div className="col-md-6">
                            <Link to='/admin/employees' className='text-decoration-none'>
                                <div className='guestFormsChild'>
                                    <div className='d-flex justify-content-around align-items-center'>
                                        <h1 className='text-theme'><i className="fa-solid fa-users"></i></h1>
                                        <div>
                                            <h4 className='text-dark'>Employees</h4>
                                            {/* <p className='text-theme'>10</p> */}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <Link to='/admin/departments' className='text-decoration-none'>
                                <div className='guestFormsChild'>
                                    <div className='d-flex justify-content-around align-items-center'>
                                        <h1 className='text-theme'><i className="fa-solid fa-sitemap"></i></h1>
                                        <div>
                                            <h4 className='text-dark'>Departments</h4>
                                            {/* <p className='text-theme'>10</p> */}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardIndex