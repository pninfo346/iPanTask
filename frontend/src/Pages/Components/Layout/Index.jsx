/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

const LayoutIndex = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [showManagerView, setShowManagerView] = useState(false)
    const [showEmployeeView, setShowEmployeeView] = useState(false)
    const [loggedInUserName, setLoggedInUserName] = useState()

    useEffect(()=> {
        if (isSidebarOpen === true) {
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        } else {
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
        }
    },[isSidebarOpen])

    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        if (token == null) {
            navigate('/')
        }else{
            const userRole = localStorage.getItem('loggedInUserRole')
            
            if (userRole == 'manager') {
                setShowManagerView(true)
                setShowEmployeeView(false)
            } 
            if (userRole == 'employee') {
                setShowManagerView(false)
                setShowEmployeeView(true)
            }

            const loggedInUserName = localStorage.getItem('loggedInUserName')
            setLoggedInUserName(loggedInUserName)
        }
    },[])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUserDepartment')
        localStorage.removeItem('loggedInUserRole')
        localStorage.removeItem('loggedInUserID')
        localStorage.removeItem('loggedInUserEmail')
        localStorage.removeItem('loggedInUserName')
        navigate(`/`)
    }

    return (
        <>
            <div id="mySidebar" className="sidebar">
                <h3 className='text-center text-theme'><i className="fa-solid fa-code-merge"></i> Task</h3>
                <hr />
                <h5 className='text-center text-theme text-capitalize'>Welcome {loggedInUserName}</h5>
                <hr />
                {
                    showManagerView ?
                    <>
                        <Link to="/admin/dashboard" className={`${location.pathname == '/admin/dashboard' ? 'activeMenu' : ''}`}><i className="fa-solid fa-gauge-high"></i> Dashboard</Link>
                        <Link to="/admin/employees" className={`${location.pathname == '/admin/employees' || location.pathname == `/admin/edit-employee/${id}` || location.pathname == `/admin/employees-from-it-department-and-location-from-A` || location.pathname == `/admin/employees-from-sales-department-in-reverse-order` ? 'activeMenu' : ''}`}><i className="fa-solid fa-users"></i> Employees</Link>
                        <Link to="/admin/departments" className={`${location.pathname == '/admin/departments' || location.pathname == `/admin/edit-department/${id}` ? 'activeMenu' : ''}`}><i className="fa-solid fa-sitemap"></i> Departments</Link>
                    </>
                    :
                    <>
                        <Link to="/admin/dashboard" className={`${location.pathname == '/admin/employee-dashboard' ? 'activeMenu' : ''}`}><i className="fa-solid fa-gauge-high"></i> Dashboard</Link>
                    </> 
                }

                <span role='button' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Sign out</span>
            </div>

            <div id="main">
                <div className='header fixed-top'>
                    <button className={`openbtn ${isSidebarOpen ? 'ms-263px' : 'ms-0px'}`} onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>☰</button>
                </div>
                <div className={`p-4 mt-60px`}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default LayoutIndex