const DepartmentModel = require("../models/Department");
const UserModel = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{

    static storeEmployee = async(req,res) => {
        // console.log(req.body)

        const {name, userName, phone, gender, hobbies, email, password, conPassword, city, state, country, role, departmentId, location} = req.body
        const hobbiesString = hobbies.join(", ")
        // console.log(departmentId);
        const departmentData = await DepartmentModel.findOne({_id: departmentId})
        // console.log(departmentData.departmentName);

        if (name && userName && phone && email && password && conPassword && city && state && country && role && departmentId && location) {
            if (password === conPassword) {
                try{
                    const hashPassword = await bcrypt.hash(password,10)
                    const data = new UserModel({
                        name: name,
                        userName: userName,
                        phone: phone,
                        email: email,
                        gender: gender,
                        hobbies: hobbiesString,
                        password: hashPassword,
                        city: city,
                        state: state,
                        country: country,
                        role: role,
                        departmentId: departmentId,
                        departmentName: departmentData.departmentName,
                        location: location,
                    })
                    const dataSaved = await data.save()

                    if (dataSaved) {
                        res.status(201).json({ status: "success", message: "EMPLOYEE REGISTRATION SUCCESSFUL 😃🍻"});
                    } else {
                        res.status(401).json({ status: "failed", message: 'Data not Save' });
                    }
                }catch(err){
                    res.status(401).json({ status: "failed", message: err });
                }
            } else {
                res.status(404).json({ status: "failed", message: "'PASSWORD AND CONFIRM PASSWORD DOES NOT MATCH 😓" });
            }
        } else {
            res.status(404).json({ status: "failed", message: "ALL FIELDS ARE REQUIRED 😓" });
        }
    }

    static getAllEmployees = async(req,res) => {
        try{
            const data = await UserModel.find({ role: 'employee' })
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            res.status(401).json({ status: "failed", message: err });
        }
    }

    static getEmployee = async(req,res) => {
        try{
            const data = await UserModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            res.status(401).json({ status: "failed", message: err });
        }
    }

    static updateEmployee = async(req,res) => {
        // console.log(req.body)

        const {name, userName, phone, gender, hobbies, email, city, state, country, role, departmentId, location} = req.body
        const hobbiesString = hobbies.join(", ")
        const departmentData = await DepartmentModel.findOne({ _id: departmentId })
        if (name && userName && phone && email && city && state && country && role) {
            try{
                const data = await UserModel.findByIdAndUpdate(req.params.id,{
                    name: name,
                    userName: userName,
                    phone: phone,
                    email: email,
                    gender: gender,
                    hobbies: hobbiesString,
                    city: city,
                    state: state,
                    country: country,
                    role: role,
                    departmentId: departmentId,
                    departmentName: departmentData.departmentName,
                    location: location,
                })
                await data.save()

                res.status(201).json({ status: "success", message: "USER UPDATED SUCCESSFULLY 😃🍻"});
            }catch(err){
                res.status(401).json({ status: "failed", message: err });
            }
        } else {
            res.status(401).json({ status: "failed", message: "ALL FIELDS ARE REQUIRED 😓" });
        }
    }

    static assignEmployees = async(req,res) => {
        try{
            const {departmentId, employeeId} = req.body
            // console.log(employeeId);

            const departmentData = await DepartmentModel.findOne({ _id: departmentId })
            await UserModel.updateMany(
                { _id: { $in: employeeId } },
                { $set: { departmentId: departmentId, departmentName: departmentData.departmentName } }
            );
        
            res.status(201).json({ status: "success", message: "USER ASSIGNED SUCCESSFULLY 😃🍻"});
        }catch(err){
            res.status(401).json({ status: "failed", message: err });
        }
    }

    static deleteEmployee = async(req,res) => {
        try{
            const data = await UserModel.findByIdAndDelete(req.params.id)

            res.status(200).send({ status: "success", message: "USER DELETED SUCCESSFULLY 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }

    static employeeFromItDepartment = async(req,res) => {
        try{
            const location = /^A/i;
            const data = await UserModel.find({ $and: [ { $or: [ { departmentName: 'it' }, { departmentName: 'IT' }, { departmentName: 'it department' }, { departmentName: 'IT Department' }, { departmentName: 'It department' }, { departmentName: 'It Department' } ] }, { role: 'employee' }, { location: location } ] })
            // console.log(data);
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

    static employeeFromSalesDepartment = async(req,res) => {
        try{
            const data = await UserModel.find({ $and: [ { $or: [ { departmentName: 'Sales' }, { departmentName: 'sales' }, { departmentName: 'SALES' }, { departmentName: 'Sales Department' }, { departmentName: 'sales department' }, { departmentName: 'Sales department' }, { departmentName: 'SALES DEPARTMENT' }, { departmentName: 'Sales and Marketing Team' }, { departmentName: 'sales and marketing team' } ] }, { role: 'employee' } ] }).sort( { _id: -1 } )

            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = UserController