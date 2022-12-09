const {Sequelize,DataTypes} = require("sequelize")
const sequelize = require("../utils/db").sequelize

const User = sequelize.define("User",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    sequelize
})


module.exports = User