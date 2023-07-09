/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable } from 'material-react-table';
import SingleLinkBreadcrumb from '../../Components/Breadcrumbs/SingleLinkBreadcrumb';

const QueryTwo = () => {

    const [data, setData] = useState([])

    const getSalesEmployeesInReverseOrder = async() => {
        await fetch('http://localhost:5000/api/i-pangram/employeeFromSalesDepartment')
        .then((res) => res.json())
        .then((data)=>{
            setData(data.data)
        })
        .catch((err)=>{
            // console.log(err);
        })
    }

    useEffect(()=>{
        getSalesEmployeesInReverseOrder()
    },[])

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <SingleLinkBreadcrumb 
                        pageName='Employees from IT Department & from Location starts with A'
                        parent='Employee'
                        url='/admin/employees'
                    />
                </div>
            </div>
            
            <div className='bg-theme p-20px'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='bg-white p-3 rounded'>
                                <div style={{overflowX: 'auto'}}>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <th className='text-nowrap'>#</th>
                                            <th className='text-nowrap'>NAME</th>
                                            <th className='text-nowrap'>USERNAME</th>
                                            <th className='text-nowrap'>EMAIL</th>
                                            <th className='text-nowrap'>GENDER</th>
                                            <th className='text-nowrap'>HOBBIES</th>
                                            <th className='text-nowrap'>PHONE</th>
                                            <th className='text-nowrap'>CITY</th>
                                            <th className='text-nowrap'>STATE</th>
                                            <th className='text-nowrap'>COUNTRY</th>
                                            <th className='text-nowrap'>DEPARTMENT</th>
                                            <th className='text-nowrap'>LOCATION</th>
                                            <th className='text-nowrap'>CREATED AT</th>
                                        </thead>
                                        <tbody>
                                            {
                                                data && data.map((val,key)=>(
                                                <tr key={key}>
                                                    <td className='text-nowrap'>{key+1}.</td>
                                                    <td className='text-nowrap'>{val?.name}</td>
                                                    <td className='text-nowrap'>{val?.userName}</td>
                                                    <td className='text-nowrap'>{val?.email}</td>
                                                    <td className='text-nowrap'>{val?.gender}</td>
                                                    <td className='text-nowrap'>{val?.hobbies}</td>
                                                    <td className='text-nowrap'>{val?.phone}</td>
                                                    <td className='text-nowrap'>{val?.city}</td>
                                                    <td className='text-nowrap'>{val?.state}</td>
                                                    <td className='text-nowrap'>{val?.country}</td>
                                                    <td className='text-nowrap'>{val?.departmentName}</td>
                                                    <td className='text-nowrap'>{val?.location}</td>
                                                    <td className='text-nowrap'>{val?.createdAt?.slice(0,10)}</td>
                                                </tr>
                                                ))
                                            }
                                            
                                        </tbody>
                                        <tfoot>
                                            <th className='text-nowrap'>#</th>
                                            <th className='text-nowrap'>NAME</th>
                                            <th className='text-nowrap'>USERNAME</th>
                                            <th className='text-nowrap'>EMAIL</th>
                                            <th className='text-nowrap'>GENDER</th>
                                            <th className='text-nowrap'>HOBBIES</th>
                                            <th className='text-nowrap'>PHONE</th>
                                            <th className='text-nowrap'>CITY</th>
                                            <th className='text-nowrap'>STATE</th>
                                            <th className='text-nowrap'>COUNTRY</th>
                                            <th className='text-nowrap'>DEPARTMENT</th>
                                            <th className='text-nowrap'>LOCATION</th>
                                            <th className='text-nowrap'>CREATED AT</th>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QueryTwo