/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BasicBreadcrumb from '../../Components/Breadcrumbs/BasicBreadcrumb'
import EmployeeTable from './Table'
import SingleLinkBreadcrumb from '../../Components/Breadcrumbs/SingleLinkBreadcrumb'

const AssignEmployee = () => {

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
                    <SingleLinkBreadcrumb 
                        pageName='Assign Employee'
                        parent='Employee'
                        url='/admin/employees'
                    />
                </div>
            </div>
            
            <div className='bg-theme p-20px'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='bg-white rounded p-3'>
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
                                    <div className='mb-3'>
                                        <label htmlFor="departmentId">Department <span className='text-danger fw-bold'>*</span></label>
                                        <select name="departmentId" id="departmentId" className='form-select' onChange={handleInput}>
                                            <option value="">---- Select Department ----</option>
                                            {
                                                departments && departments.map((val,key)=>(
                                                    <option key={key} value={val?._id}>{val?.departmentName} </option>
                                                )) 
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="employeeId">Employees <span className='text-danger fw-bold'>*</span></label>
                                        {
                                            employeesFromBackend && employeesFromBackend.map((val,key)=>(
                                                <div key={key}>
                                                    <input type="checkbox" name='employeeId' value={val?._id} onChange={handleEmployeeChange} /> {val?.name}&nbsp;&nbsp;&nbsp;
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-custom">Assign</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AssignEmployee