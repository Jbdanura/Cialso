const User = require("../models/User")
const Follow =  require("../models/Follow")
const Post = require("../models/Post")
const Like = require("../models/Like")

const associations = async()=>{
    User.hasMany(Post)
    Post.belongsTo(User)
    User.belongsToMany(User,{through:Follow, as:"following", foreignKey:"followingId"})
    User.belongsToMany(User,{through:Follow, as:"follower", foreignKey:"followerId"})
    Follow.belongsTo(User, { as: 'follower', foreignKey: 'followerId' });
    Follow.belongsTo(User, { as: 'following', foreignKey: 'followingId' });
    Post.belongsToMany(User,{through:Like, as:"likedBy",foreignKey:"postId"})
    User.belongsToMany(Post,{through:Like,as:"likedPosts",foreignKey:"userId"})
}

module.exports = associations