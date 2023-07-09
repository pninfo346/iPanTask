const DepartmentModel = require("../models/Department");

class DepartmentController{

    static storeDepartment = async(req,res) => {
        console.log(req.body)

        // const {departmentName, categoryName, location, salary} = req.body
        // const department = await DepartmentModel.findOne({departmentName:departmentName})
        // if (department) {
        //     res.status(404).json({ status: "failed", message: "THIS DEPARTMENT IS ALREADY EXIST 😓" });
        // } else {
        //     if (departmentName && categoryName && location && salary) {
        //         try{
        //             const data = new DepartmentModel({
        //                 departmentName: departmentName,
        //                 categoryName: categoryName,
        //                 location: location,
        //                 salary: salary,
        //             })
        //             await data.save()

        //             res.status(201).json({ status: "success", message: "DEPARTMENT ADDED SUCCESSFULLY 😃🍻"});
        //         }catch(err){
        //             res.status(401).json({ status: "failed", message: err });
        //         }
        //     } else {
        //         res.status(404).json({ status: "failed", message: "ALL FIELDS ARE REQUIRED 😓" });
        //     }
        // }
    }

    static getAllDepartments = async(req,res) => {
        try{
            const data = await DepartmentModel.find()
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            res.status(401).json({ status: "failed", message: err });
        }
    }

    static getDepartment = async(req,res) => {
        try{
            const data = await DepartmentModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                data
            })
        }catch(err){
            res.status(401).json({ status: "failed", message: err });
        }
    }

    static updateDepartment = async(req,res) => {
        // console.log(req.body)

        const {departmentName, categoryName, location, salary} = req.body
        const department = await DepartmentModel.findOne({departmentName:departmentName})

        if (department) {
            res.status(404).json({ status: "failed", message: "THIS DEPARTMENT IS ALREADY EXIST 😓" });
        } else {
            if (departmentName && categoryName && location && salary) {
                try{
                    const data = await DepartmentModel.findByIdAndUpdate(req.params.id,{
                        departmentName: departmentName,
                        categoryName: categoryName,
                        location: location,
                        salary: salary,
                    })
                    await data.save()

                    res.status(201).json({ status: "success", message: "DEPARTMENT UPDATED SUCCESSFULLY 😃🍻"});
                }catch(err){
                    res.status(401).json({ status: "failed", message: err });
                }
            } else {
                res.status(404).json({ status: "failed", message: "ALL FIELDS ARE REQUIRED 😓" });
            }
        }
    }

    static deleteDepartment = async(req,res) => {
        try{
            const data = await DepartmentModel.findByIdAndDelete(req.params.id)

            res.status(200).send({ status: "success", message: "DEPARTMENT DELETED SUCCESSFULLY 😃🍻"});
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = DepartmentController