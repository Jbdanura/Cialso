const sequelize = require("..utils/db").sequelize
const {DataTypes} = require("sequelize")

const Like = sequelize.define("Like", {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      },
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Post",
        key: "id"
      },
      allowNull: false
    },
  },{
    sequelize,
    timestamps: true
});
  