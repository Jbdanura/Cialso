require("dotenv").config({path:"./keys/.env"})

const Post = require("../models/Post")
const User = require("../models/User").User
const postsRouter = require("express").Router()
const jwt = require("jsonwebtoken")

const getToken = req => {
    const authorization = req.get("authorization")
    if(authorization && authorization.toLowerCase().startsWith("bearer ")){
        const token = authorization.substring(7)
        return token
    }
}

postsRouter.post("/new", async(req,res)=>{
    const description = req.body.description
    const token = getToken(req)
    const decodedToken = jwt.verify(token,process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({error: "token missing or invalid"})
    }
    const user = await User.findByPk(decodedToken.id)
    const post = await Post.create({
        description,
        UserId: decodedToken.id
    })
    res.json(description)
})

module.exports = postsRouter