import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const DNSSyncLog = sequelize.define(
  "DNSSyncLog",
  {
    sync_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    domain_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM("SUCCESS","FAILED"),
      allowNull: false
    },

    records_fetched: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    error_message: {
      type: DataTypes.TEXT
    }

  },
  {
    tableName: "dns_sync_logs",
    timestamps: true
  }
)

export default DNSSyncLog