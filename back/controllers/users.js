require("dotenv").config({path:"./keys/.env"})

const User = require("../models/User")
const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Post = require("../models/Post")
const Follow = require("../models/Follow")

const { Op } = require('sequelize');

usersRouter.get("/all",async(req,res)=>{
    try {
        const users = await User.findAll({
            attributes:["avatar","name","lastname","username"]
        })
        return res.status(200).send(users)
    } catch (error) {
        return res.status(400).send(error)
    }
})

usersRouter.post("/user/:username",async(req,res)=>{
    try {
        const page = req.body.page
        const username = req.params.username.split(" ")
        if(username.length === 1){
            const user = await User.findOne({where:{username: {[Op.iLike]:`%${username}%`}},
            include: [{
                model: Post,
                limit: 10 * page,
                order: [["createdAt", "DESC"]]
            }
            ]})
            return res.status(200).send(user)
        } else if (username.length === 2){
            const user = await User.findOne({where:{name:{[Op.iLike]:`%${username[0]}%`}, lastname: {[Op.iLike]:`%${username[1]}%`}},
            include: [{
                model: Post,
                limit: 10 * page,
                order: [["createdAt", "DESC"]]
            }
            ]})
            console.log(user)
            return res.status(200).send(user)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
})

usersRouter.post("/account/new",async(req,res)=>{
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
        const user = await User.create({name,lastname,avatar:false,username,email,password:hashedPassword})
        return res.status(201).send("Account created!")  
    } catch (error) {
        return res.status(400).send(error)
    }
})

usersRouter.post("/follow",async(req,res)=>{
    console.log("gerere")
    try{
        console.log(req.body)
        const userToFollow = await User.findOne({where: {username:req.body.userToFollow}})
        const user = await User.findOne({where: {username:req.body.user}})
        const alreadyFollowing = await Follow.findOne({where:{followingId:userToFollow.id, followerId:user.id}})
        console.log(userToFollow,user,alreadyFollowing)
        if(alreadyFollowing){
            await alreadyFollowing.destroy()
            console.log("false follow")
            return res.status(200).send(false)
        }
        const follow = await Follow.create({followingId: userToFollow.id, followerId: user.id})
        if(follow){
            console.log("follow")
            return res.status(200).send(true)
        }
    } catch(error){
        console.log(error)
        return res.status(400).send(error)
    }
})

usersRouter.post("/followingState",async(req,res)=>{
    try{
        const following = await User.findOne({where: {username:req.body.following}})
        const follower = await User.findOne({where: {username:req.body.follower}})
        const follow = await Follow.findOne({where:{followingId:following.id, followerId:follower.id}})
        if(follow){
            return res.status(200).send(true)
        } else{
            return res.status(200).send(false)
        }
    } catch(error){
        console.log(error)
    }
})

usersRouter.get("/whoFollow/:username",async(req,res)=>{
    try{
        const user = await User.findOne({where:{username:req.params.username}})
        const following = await Follow.findAll({
            where:{followerId:user.id},
            include:[{
                model: User,
                as:"following",
                attributes:["avatar","name","lastname","username"]
            }],
        })
        const followers = await Follow.findAll({
            where:{followingId:user.id},
            include:[{
                model: User,
                as:"follower",
                attributes:["avatar","name","lastname","username"]
            }],
            
        })
        return res.status(200).json({following,followers})
    } catch(error){
        console.log(error)
        return res.status(400).send(error)
    }
})

usersRouter.post("/account/login",async(req,res)=>{
    try {
        console.log("body")
        const {username,password} = req.body
        if(!username || !password){
            return res.status(400).send("Missing field")
        }

        const user = await User.findOne({where : {username:username}})
        if(!user){
            return res.status(400).send("Account does not exist")
        }

        const passwordCorrect = await bcrypt.compare(password,user.password)
        if(!passwordCorrect){
            return res.status(400).send("Incorrect password")
        }
        const userForToken = {
            username: user.username,
            id: user.id
        }
        const token = jwt.sign(userForToken, process.env.SECRET)
        res.status(200).send({token,username:username})
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = usersRouter