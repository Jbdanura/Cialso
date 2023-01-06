const {Sequelize,DataTypes} = require("sequelize")
const sequelize = require("../utils/db").sequelize

const Post = sequelize.define("Post",{
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    sequelize,
    timestamps:true
})


module.exports = Post