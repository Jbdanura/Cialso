const User = require("../models/User")
const bcrypt = require("bcrypt")

const usersRouter = require("express").Router()

usersRouter.get("/all",async(req,res)=>{
    try {
        const users = await User.findAll()
        return res.status(200).send(users)
    } catch (error) {
        return res.status(400).send(error)
    }

})

usersRouter.post("/new",async(req,res)=>{
    try {
        const {name,lastname,username,email,password} = req.body
        if(!name || !lastname || !username || !email || !password){
            return res.status(400).send("All fields must be filled")
        }
        const existsUser = await User.findOne({ where: { username: username } });
        if(existsUser){
            return res.status(400).send("Username already taken")
        }
        const existsEmail = await User.findOne({ where: { email: email } });
        if(existsEmail){
            return res.status(400).send("Email already taken")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,lastname,username,email,password:hashedPassword})
        return res.status(201).send("Account created!")  
    } catch (error) {
        return res.status(400).send(error)
    }

})

module.exports = usersRouter