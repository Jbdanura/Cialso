const Post = require("../models/Post")
const postsRouter = require("express").Router()

postsRouter.post("/new", async(req,res)=>{
    const description = req.body.description
    console.log(description)
    res.json(description)
})

module.exports = postsRouter