import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Domain = sequelize.define(
  "Domain",
  {
    domain_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    domain_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    zone_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    //Add Api token 
    api_token:{
       type: DataTypes.STRING,
       allowNull: true
    },
    
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cost_center_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    control_panel_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    dns_control_panel_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    requested_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    usage_flag: {
      type: DataTypes.ENUM("INTERNAL","EXTERNAL"),
      allowNull: false
    },

    registered_date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM("ACTIVE","EXPIRED","INACTIVE"),
      defaultValue: "ACTIVE"
    }
  },
  {
    tableName: "domains",
    timestamps: true
  }
)

export default Domain