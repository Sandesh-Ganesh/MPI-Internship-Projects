import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const SSLCertificate = sequelize.define(
  "SSLCertificate",
  {
    ssl_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    domain_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    // link renewals together
    parent_ssl_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    ssl_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cert_type: {
      type: DataTypes.ENUM("DV","OV","EV"),
      allowNull: false
    },

    validation_type: {
      type: DataTypes.ENUM("DNS","EMAIL"),
      allowNull: false
    },

    encryption_type: {
      type: DataTypes.ENUM("RSA","ECC"),
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

    vendor_id: {
      type: DataTypes.INTEGER
    },

    control_panel_id: {
      type: DataTypes.INTEGER
    },

    requested_by: {
      type: DataTypes.INTEGER
    },

    approved_by: {
      type: DataTypes.INTEGER
    },

    remarks: {
      type: DataTypes.TEXT
    },

    status: {
      type: DataTypes.ENUM("ACTIVE","EXPIRED","INACTIVE"),
      defaultValue: "ACTIVE"
    }
  },
  {
    tableName: "ssl_certificates",
    timestamps: true
  }
)

export default SSLCertificate