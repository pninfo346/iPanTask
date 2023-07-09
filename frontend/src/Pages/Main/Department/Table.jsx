/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable } from 'material-react-table';
import { Drawer } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DepartmentTable = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [data, setData] = useState([])
    const [showResponse, setShowResponse] = useState(false)
    const [messageText, setMessageText] = useState()
    const [refreshTable, setRefreshTable] = useState(false)

    const columns = useMemo(() => [
        {
            id: 'Action',
            header: "Action",
            disableFilters: true,
            enableGlobalFilter: false,
            enableColumnFilter: false,
            enableColumnOrdering: false,
            accessorFn: (val) => {
                return (
                    <div className='d-flex gap-10'>
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => handleEdit(val._id)}><i className="fa-solid fa-pen-to-square"></i></button>    
                        <button type="button" className='btn btn-sm btn-theme' onClick={() => handleDelete(val._id)}><i className="fa-solid fa-trash-can"></i></button>    
                    </div>
                )
            }
        },
        {
            header: "Department Name",
            accessorKey: "departmentName",
            enableGlobalFilter: true,
        },
        {
            header: "Category Name",
            accessorKey: "categoryName",
            enableGlobalFilter: true,
        },
        {
            header: "Location",
            accessorKey: "location",
            enableGlobalFilter: true,
        },
        {
            header: "Salary",
            accessorKey: "salary",
            enableGlobalFilter: true,
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            enableGlobalFilter: true,
        },
    ]);

    const handleEdit = (id) =>{
        navigate(`/admin/edit-department/${id}`)
    }

    const handleDelete = async(id) =>{
        await fetch(`http://localhost:5000/api/i-pangram/deleteDepartment/${id}`)
        .then(res => res.json())
        .then((data) => {
            setShowResponse(true)
            setMessageText(data.message)
            setRefreshTable(true)
        }) 
    }

    const getAllDepartments = async() => {
        await fetch('http://localhost:5000/api/i-pangram/getAllDepartments')
        .then((res) => res.json())
        .then((data)=>{
            setData(data.data)
            setRefreshTable(false)
        })
        .catch((err)=>{
            // console.log(err);
        })
    }

    useEffect(()=>{
        getAllDepartments()
    },[])

    useEffect(()=>{
        getAllDepartments()
    },[refreshTable])

    return (
        <>
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
        </>
    )
}

export default DepartmentTable