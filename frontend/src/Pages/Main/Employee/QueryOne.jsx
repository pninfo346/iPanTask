/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable } from 'material-react-table';
import SingleLinkBreadcrumb from '../../Components/Breadcrumbs/SingleLinkBreadcrumb';

const QueryOne = () => {

    const [data, setData] = useState([])

    const columns = useMemo(() => [
        {
            header: "Employee Name",
            accessorKey: "name",
            enableGlobalFilter: true,
        },
        {
            header: "Username",
            accessorKey: "userName",
            enableGlobalFilter: true,
        },
        {
            header: "Phone",
            accessorKey: "phone",
            enableGlobalFilter: true,
        },
        {
            header: "Email",
            accessorKey: "email",
            enableGlobalFilter: true,
        },
        {
            header: "Gender",
            accessorKey: "gender",
            enableGlobalFilter: true,
        },
        {
            header: "Hobbies",
            accessorKey: "hobbies",
            enableGlobalFilter: true,
        },
        {
            header: "City",
            accessorKey: "city",
            enableGlobalFilter: true,
        },
        {
            header: "State",
            accessorKey: "state",
            enableGlobalFilter: true,
        },
        {
            header: "Country",
            accessorKey: "country",
            enableGlobalFilter: true,
        },
        {
            header: "Department Name",
            accessorKey: "departmentName",
            enableGlobalFilter: true,
        },
        {
            header: "Location",
            accessorKey: "location",
            enableGlobalFilter: true,
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            enableGlobalFilter: true,
        },
    ]);

    const getITEmployeesFromLocationA = async() => {
        await fetch('http://localhost:5000/api/i-pangram/employeeFromItDepartment')
        .then((res) => res.json())
        .then((data)=>{
            setData(data.data)
        })
        .catch((err)=>{
            // console.log(err);
        })
    }

    useEffect(()=>{
        getITEmployeesFromLocationA()
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
                        <MaterialReactTable
                            data={data}
                            enableTopToolbar
                            columns={columns}
                            enableSorting={true}
                            enablePagination={true}
                            enableColumnFilters={true}
                            enableColumnActions={false}
                            enableBottomToolbar={true}
                            enableDensityToggle={false}
                            positionGlobalFilter="right"
                            enableColumnsToggle={false}
                            enableFullScreenToggle={false}
                            enableStickyHeader
                        />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QueryOne