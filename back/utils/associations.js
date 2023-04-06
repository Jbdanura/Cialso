const User = require("../models/User")
const Follow =  require("../models/Follow")
const Post = require("../models/Post")
const Like = require("../models/Like")
const Comment = require("../models/Comment")

const associations = async()=>{
    User.hasMany(Post)
    Post.belongsTo(User)
    User.belongsToMany(User,{through:Follow, as:"following", foreignKey:"followingId"})
    User.belongsToMany(User,{through:Follow, as:"follower", foreignKey:"followerId"})
    Follow.belongsTo(User, { as: 'follower', foreignKey: 'followerId' });
    Follow.belongsTo(User, { as: 'following', foreignKey: 'followingId' });
    Post.belongsToMany(User,{through:Like, as:"likedBy",foreignKey:"postId"})
    User.belongsToMany(Post,{through:Like,as:"likedPosts",foreignKey:"userId"})
    User.hasMany(Comment)
    Post.hasMany(Comment)
    Comment.belongsTo(User)
    Comment.belongsTo(Post)
}

module.exports = associations