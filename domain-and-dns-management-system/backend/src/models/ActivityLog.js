import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const ActivityLog = sequelize.define(
  "ActivityLog",
  {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    log_type: {
      type: DataTypes.ENUM("DOMAIN","SSL","DNS"),
      allowNull: false
    },

    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    action: {
      type: DataTypes.ENUM("CREATE","UPDATE","DELETE"),
      allowNull: false
    },

    old_value: {
      type: DataTypes.JSON,
      allowNull: true
    },

    new_value: {
      type: DataTypes.JSON,
      allowNull: true
    }

  },
  {
    tableName: "activity_logs",
    timestamps: true
  }
)

export default ActivityLog