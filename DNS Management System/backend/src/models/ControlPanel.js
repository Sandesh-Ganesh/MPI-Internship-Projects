import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const ControlPanel = sequelize.define(
  "ControlPanel",
  {
    control_panel_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    panel_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    hosting_flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    dns_flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    ssl_flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM("ACTIVE","INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE"
    }
  },
  {
    tableName: "control_panels",
    timestamps: false
  }
)

export default ControlPanel