import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const CostCenter = sequelize.define(
    "CostCenter",
    {
        cost_center_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cost_center_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        status:{
            type:DataTypes.ENUM("ACTIVE","INACTIVE"),
            allowNull:false,
            defaultValue:"ACTIVE"
        }
    },
    {
        tableName:"cost_centers",
        timestamps:false
    }
)

export default CostCenter