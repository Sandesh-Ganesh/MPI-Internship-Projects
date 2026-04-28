import { sequelize } from "../config/database.js"

import Company from "./Company.js"
import CostCenter from "./CostCenter.js"
import Vendor from "./Vendor.js"
import ControlPanel from "./ControlPanel.js"
import Domain from "./Domain.js"
import DNSRecord from "./DNSRecord.js"
import SSLCertificate from "./SSLCertificate.js"
import ActivityLog from "./ActivityLog.js"
import DNSSyncLog from "./DNSSyncLog.js"
import User from "./User.js"


//  Company → CostCenter
Company.hasMany(CostCenter, { foreignKey: "company_id" })
CostCenter.belongsTo(Company, { foreignKey: "company_id" })


// Company → Domain
Company.hasMany(Domain, { foreignKey: "company_id" })
Domain.belongsTo(Company, { foreignKey: "company_id" })


// CostCenter → Domain
CostCenter.hasMany(Domain, { foreignKey: "cost_center_id" })
Domain.belongsTo(CostCenter, { foreignKey: "cost_center_id" })


// Vendor → ControlPanel
Vendor.hasMany(ControlPanel, { foreignKey: "vendor_id" })
ControlPanel.belongsTo(Vendor, { foreignKey: "vendor_id" })


// ControlPanel → Domain (hosting panel)
ControlPanel.hasMany(Domain, { foreignKey: "control_panel_id" })
Domain.belongsTo(ControlPanel, { foreignKey: "control_panel_id" })


// ControlPanel → Domain (DNS panel)
ControlPanel.hasMany(Domain, { foreignKey: "dns_control_panel_id" })
Domain.belongsTo(ControlPanel, { foreignKey: "dns_control_panel_id", as: "dnsPanel" })


// Vendor → Domain
Vendor.hasMany(Domain, { foreignKey: "vendor_id" })
Domain.belongsTo(Vendor, { foreignKey: "vendor_id" })


// Domain → DNS Records
Domain.hasMany(DNSRecord, { foreignKey: "domain_id", as:"dnsRecords" })
DNSRecord.belongsTo(Domain, { foreignKey: "domain_id",  as:"domain" })


// Domain → SSL Certificates
Domain.hasMany(SSLCertificate, { foreignKey: "domain_id" })
SSLCertificate.belongsTo(Domain, { foreignKey: "domain_id" })


// SSL self relation (renewal chain)
SSLCertificate.belongsTo(SSLCertificate, {
  foreignKey: "parent_ssl_id",
  as: "parentSSL"
})

SSLCertificate.hasMany(SSLCertificate, {
  foreignKey: "parent_ssl_id",
  as: "renewals"
})


// User relations (requested / approved)
User.hasMany(Domain, { foreignKey: "requested_by", as: "requestedDomains" })
User.hasMany(Domain, { foreignKey: "approved_by", as: "approvedDomains" })

User.hasMany(SSLCertificate, { foreignKey: "requested_by", as: "requestedSSLs" })
User.hasMany(SSLCertificate, { foreignKey: "approved_by", as: "approvedSSLs" })


// Activity Logs
ActivityLog.belongsTo(User, { foreignKey: "user_id" })


// DNS Sync Logs
DNSSyncLog.belongsTo(Domain, { foreignKey: "domain_id" })


// Export everything
export {
  sequelize,
  Company,
  CostCenter,
  Vendor,
  ControlPanel,
  Domain,
  DNSRecord,
  SSLCertificate,
  ActivityLog,
  DNSSyncLog,
  User
}