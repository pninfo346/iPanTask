const UserModel = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController{

    static register = async(req,res) => {
        // console.log(req.body)

        const {name, userName, phone, gender, hobbies, email, password, conPassword, city, state, country, role, departmentId, departmentName, location} = req.body
        const hobbiesString = hobbies.join(", ")
        const user = await UserModel.findOne({email:email})
        if (user) {
            res.status(404).json({ status: "failed", message: "THIS EMAIL IS ALREADY EXIST 😓" });
        } else {
            if (name && email && password && conPassword) {
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
                            departmentName: departmentName,
                            location: location,
                        })
                        const dataSaved = await data.save()

                        if (dataSaved) {
                            res.status(201).json({ status: "success", message: "USER REGISTRATION SUCCESSFUL 😃🍻"});
                        } else {
                            res.status(401).json({ status: "failed", message: 'Data not Save' });
                        }
                    }catch(err){
                        res.status(401).json({ status: "failed", message: err });
                    }
                } else {
                    res.status(404).json({ status: "failed", message: "PASSWORD AND CONFIRM PASSWORD DOES NOT MATCH 😓" });
                }
            } else {
                res.status(404).json({ status: "failed", message: "ALL FIELDS ARE REQUIRED 😓" });
            }
        }
    }

    static login = async(req,res) => {
        try{
            // console.log(req.body)
            const {email, password} = req.body
            // console.log(password)
            if (email && password) {
                const user = await UserModel.findOne({email : email})
                // console.log(user)
                if (user != null) {
                    const isMatched = await bcrypt.compare(password,user.password)
                    if ((user.email === email) && isMatched) {
                        //generate jwt token
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
                        // console.log(token)
                        res.cookie('token',token)

                        res.status(201).json({ status: "success", message: "LOGIN SUCCESSFUL WITH WEB TOKEN 😃🍻", token, user});
                    } else {
                        res.status(401).json({ status: "failed", message: "EMAIL AND PASSWORD IS NOT VALID 😓" });
                    }
                } else {
                    res.status(401).json({ status: "failed", message: "YOU ARE NOT REGISTERED USER 😓" });
                }
            } else {
                res.status(401).json({ status: "failed", message: "ALL FIELDS ARE REQUIRED 😓" });
            }
        }catch(err){
            res.status(401).json({ status: "failed", message: err });
        }
    }

    static logout = async(req,res) => {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });

            res.status(200).json({
                success: true,
                message: "LOGGED OUT 😃🍻",
            });
        } catch (error) {
            res.status(401).json({ status: "failed", message: err });
        }
    }

}

module.exports = AuthController