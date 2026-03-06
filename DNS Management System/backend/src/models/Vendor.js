import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js" 

const Vendor = sequelize.define(
    "Vendor",
    {
        vendor_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        vendor_name:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
        },
        status:{
            type:DataTypes.ENUM("ACTIVE","INACTIVE"),
            defaultValue:"ACTIVE",
            allowNull: false
        }
    },
    {
        tableName:"vendors",
        timestamps:"false",
    }
)

export default Vendor