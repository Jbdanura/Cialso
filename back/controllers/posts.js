const Post = require("../models/Post")
const postsRouter = require("express").Router()

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
    console.log(description)
    console.log(token)
    
    res.json(description)
})

module.exports = postsRouter