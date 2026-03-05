import { DataTypes } from "sequelize"
import { sequelize } from "../config/database"

const Company = sequelize.define(
    "Company",
    {
        company_id:{
            type : DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        company_name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        company_code:{
            type:DataTypes.STRING(10),
            unique:true,
            allowNull:false
        },
        status:{
            type:DataTypes.ENUM('ACTIVE','INACTIVE'),
            defaultValue:'ACTIVE'
        }
    },
    {
    tableName: "companies",
    timestamps: false
  }
)