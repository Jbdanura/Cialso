const sequelize = require("../utils/db").sequelize
const {DataTypes} = require("sequelize")

const Follow = sequelize.define("Follow",{
    followerId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    followingId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize
})

module.exports = Follow