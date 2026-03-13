import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const DNSRecord = sequelize.define(
  "DNSRecord",
  {
    dns_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },

    domain_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },

    provider_record_id:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },

    record_type:{
      type:DataTypes.STRING,
      allowNull:false
    },

    dns_name:{
      type:DataTypes.STRING,
      allowNull:false
    },

    record_value:{
      type:DataTypes.STRING,
      allowNull:false
    },

    ttl:{
      type:DataTypes.INTEGER
    },

    priority:{
      type:DataTypes.INTEGER
    },

    proxied:{
      type:DataTypes.BOOLEAN
    },

    status:{
      type:DataTypes.ENUM("ACTIVE","DELETED"),
      defaultValue:"ACTIVE"
    }
  },
  {
    tableName:"dns_records",
    timestamps:true
  }
)

export default DNSRecord