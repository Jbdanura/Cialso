const User = require("../models/User").User
const Friendship = require("../models/User").Friendship
const Post = require("../models/Post")
const Comment = require("../models/Comment")

const associations = async()=>{
    User.hasMany(Post)
    Post.belongsTo(User)
}

module.exports = associations