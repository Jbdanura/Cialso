require("dotenv").config({path:"./keys/.env"})

const Post = require("../models/Post")
const User = require("../models/User")
const postsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Follow = require("../models/Follow")
const {getToken} = require("../utils/controllers")
const Like = require("../models/Like")

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
    res.status(200).json(description)
})

postsRouter.get("/:username",async(req,res)=>{
    const username = req.params.username
    const user = await User.findOne({where:{username}})
    return res.status(200).send(user)
})
postsRouter.put("/:postId",async(req,res)=>{
    try {
        const token = getToken(req)
        const decodedToken = jwt.verify(token,process.env.SECRET)
        const post = await Post.findByPk(req.params.postId,{include:User})
       if(decodedToken.id !== post.User.id){
        return res.status(400).send({error:"missing or invalid token"})
       }
        await post.update({description: req.body.description})
        return res.status(200).send(post)  
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }

})

postsRouter.post("/followingPosts/:username",async(req,res)=>{
    const page = req.body.page
    const limit = 10
    const user = await User.findOne({where:{username:req.params.username}})
    // Find all follow records where the user is the follower
    const follows = await Follow.findAll({
        where: { followerId: user.id },
    });

    // Extract the array of followingIds from the follow records
    const followingIds = follows.map((follow) => follow.followingId);

    // Find all posts that were created by the users that the user is following
    const posts = await Post.findAll({
        include: [
        {
            model: User,
            where: { id: followingIds },
        },
        ],
        limit: page * limit,
    });
    return res.status(200).send(posts)
})

postsRouter.post("/like/:postId",async(req,res)=>{
    try {
        const postId = req.params.postId
        const username = req.body.username
        const token = getToken(req)
        const decodedToken = jwt.verify(token,process.env.SECRET)
        if(!decodedToken.id){
            return res.status(401).json({error: "token missing or invalid"})
        }
        const user = await User.findByPk(decodedToken.id)
        if(user.username !== username){
            return res.status(400).send("invalid user")
        }
        const existsLike = await Like.findOne({postId, userId:user.id})
        if(!existsLike){
            const like = await Like.create({postId, userId:user.id})
            return res.status(200).send(like)
        } else {
            await existsLike.destroy()
            return res.status(200).send("removed like")
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    } 
})

module.exports = postsRouter