const {Sequelize,DataTypes} = require("sequelize")
const sequelize = require("../utils/db").sequelize

const User = sequelize.define("User",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize
})

module.exports = User