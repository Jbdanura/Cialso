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

const Friendship = sequelize.define("Friendship",{
    user:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: "User",
            key: "id"
        }
    },
    friend:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: "User",
            key: "id"
        }
    }
})

module.exports = {User,Friendship}