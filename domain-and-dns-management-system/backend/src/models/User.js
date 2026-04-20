import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "MANAGER", "USER"),
      defaultValue: "USER",
    },

    status: {
      type: DataTypes.ENUM("ACTIVE","INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "users",      // IMPORTANT
    timestamps: false,       // if no createdAt / updatedAt
  }
);

export default User;
