import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

const Notification = sequelize.define(
  'Notification',
  {
    notification_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM(
        'success',
        'warning',
        'error',
        'info'
      ),
      defaultValue: 'info',
    },

    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'notifications',
    timestamps: true,
  }
)

export default Notification