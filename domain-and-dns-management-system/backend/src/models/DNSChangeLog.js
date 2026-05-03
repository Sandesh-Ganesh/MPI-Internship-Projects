import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const DNSChangeLog = sequelize.define(
  "DNSChangeLog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    domain_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    provider_record_id: {
      type: DataTypes.STRING,
    },
    action: {
      type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE"),
      allowNull: false,
    },
    old_value: {
      type: DataTypes.JSON,
    },
    new_value: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "dns_change_logs",
    timestamps: true,
  }
)

export default DNSChangeLog