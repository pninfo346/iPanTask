/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BasicBreadcrumb from '../../Components/Breadcrumbs/BasicBreadcrumb'
import EmployeeTable from './Table'

const EmployeeIndex = () => {

    var fields = {
        employeeId: '',
        departmentId: '',
    }

    const [data, setData] =  useState(fields)
    const [employees, setEmployees] = useState([])
    const [employeesFromBackend, setEmployeesFromBackend] = useState([])
    const [departments, setDepartments] = useState([])
    const [showResponse, setShowResponse] = useState(false)
    const [messageText, setMessageText] = useState()

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleEmployeeChange = (event) => {
        const checkboxValue = event.target.value;
        const updatedCheckboxes = [...employees];
      
        if (event.target.checked) {
          updatedCheckboxes.push(checkboxValue);
        } else {
          const index = updatedCheckboxes.indexOf(checkboxValue);
          if (index > -1) {
            updatedCheckboxes.splice(index, 1);
          }
        }
      
        setEmployees(updatedCheckboxes);
    };

    const getAllEmployees = async() => {
        await fetch('http://localhost:5000/api/i-pangram/getAllEmployees')
        .then((res) => res.json())
        .then((data)=>{
            // setEmployees(data.data)
            setEmployeesFromBackend(data.data)
        })
        .catch((err)=>{
            // console.log(err);
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
        getAllEmployees()
        getAllDepartments()
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = {
            departmentId: data.departmentId,
            employeeId: employees,
        };

        // console.log(formData);

        await fetch(`http://localhost:5000/api/i-pangram/assignEmployees`,{
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
            departmentId: '',
            employeeId: [],
        })
    }

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <BasicBreadcrumb 
                        pageName='Employee'
                    />
                </div>
                <div className='d-flex gap-2'>
                    <Link to='/admin/add-employee' className='btn btn-sm btn-custom'><i className="fa-solid fa-plus"></i> Add New</Link>
                    <Link to='/admin/assign-employee' className='btn btn-sm btn-custom'><i className="fa-solid fa-list-check"></i> Assign</Link>
                </div>
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