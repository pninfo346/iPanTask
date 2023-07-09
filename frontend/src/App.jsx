/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import SignIn from "./Pages/Guest/SignIn"
import SignUp from "./Pages/Guest/SignUp"
import './App.css'
import DashboardIndex from "./Pages/Main/Dashboard/Index"
import LayoutIndex from "./Pages/Components/Layout/Index"
import DepartmentIndex from "./Pages/Main/Department/Index"
import DepartmentEdit from "./Pages/Main/Department/Edit"
import DepartmentAdd from "./Pages/Main/Department/Add"
import EmployeeIndex from "./Pages/Main/Employee/Index"
import EmployeeAdd from "./Pages/Main/Employee/Add"
import EmployeeEdit from "./Pages/Main/Employee/Edit"
import QueryOne from "./Pages/Main/Employee/QueryOne"
import QueryTwo from "./Pages/Main/Employee/QueryTwo"
import EmployeeDashboardIndex from "./Pages/Main/Dashboard/EmployeeDashboard"
import AssignEmployee from "./Pages/Main/Employee/AssignEmployee"


const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/admin" element={<LayoutIndex />}>
          
          {/* Department module route */}
          <Route path="/admin/dashboard" element={<DashboardIndex />} />
          <Route path="/admin/departments" element={<DepartmentIndex />} />
          <Route path="/admin/add-department" element={<DepartmentAdd />} />
          <Route path="/admin/edit-department/:id" element={<DepartmentEdit />} />
          
          {/* Employee module route */}
          <Route path="/admin/employee-dashboard" element={<EmployeeDashboardIndex />} />
          <Route path="/admin/employees" element={<EmployeeIndex />} />
          <Route path="/admin/add-employee" element={<EmployeeAdd />} />
          <Route path="/admin/assign-employee" element={<AssignEmployee />} />
          <Route path="/admin/edit-employee/:id" element={<EmployeeEdit />} />
          <Route path="/admin/employees-from-it-department-and-location-from-A" element={<QueryOne />} />
          <Route path="/admin/employees-from-sales-department-in-reverse-order" element={<QueryTwo />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
