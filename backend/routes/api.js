const AuthController = require('../controllers/AuthController')
const DepartmentController = require('../controllers/DepartmentController')
const UserController = require('../controllers/UserController')
const { UserAuth, AuthRoles } = require('../middleware/Auth')
const express = require('express')
const router = express.Router()


//AuthController
router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.get('/logout',AuthController.logout)


//UserController
router.post('/storeEmployee',UserController.storeEmployee)
router.get('/getAllEmployees',UserController.getAllEmployees)
router.get('/getEmployee/:id',UserController.getEmployee)
router.post('/updateEmployee/:id',UserController.updateEmployee)
router.get('/deleteEmployee/:id',UserController.deleteEmployee)
router.get('/employeeFromItDepartment',UserController.employeeFromItDepartment)
router.get('/employeeFromSalesDepartment',UserController.employeeFromSalesDepartment)



//DepartmentController
router.post('/storeDepartment',DepartmentController.storeDepartment)
router.get('/getAllDepartments',DepartmentController.getAllDepartments)
router.get('/getDepartment/:id',DepartmentController.getDepartment)
router.post('/updateDepartment/:id',DepartmentController.updateDepartment)
router.get('/deleteDepartment/:id',DepartmentController.deleteDepartment)






module.exports = router