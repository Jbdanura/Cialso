const {DataTypes} = require("sequelize")
const sequelize = require("../utils/db").sequelize

const Comment = sequelize.define("Comment",{
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    sequelize
})

module.exports = Comment