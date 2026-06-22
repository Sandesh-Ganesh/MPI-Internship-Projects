import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import adminOnlyRoutes from './routes/adminOnlyRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js'
import controlPanelRoutes from './routes/controlPanelRoutes.js'
import costCenterRoutes from './routes/costCenterRoutes.js';
import domainRoutes from './routes/domainRoutes.js'
import "./cron/dnsSyncJob.js"
import "./cron/sslStatusJob.js"
import "./cron/domainStatusJob.js"
import dnsRoutes from './routes/dnsRoutes.js'
import activityLogRoutes from './routes/activityLogRoutes.js'
import SSLCerticateRoutes from './routes/SSLCertificateRoutes.js'
import dnsSyncLogRoutes from './routes/dnsSyncLogRoutes.js'
import dnsChangeLogRoutes from './routes/dnsChangeLogRoutes.js'
import {
  Company,
  CostCenter,
  Vendor,
  ControlPanel,
  Domain,
  DNSRecord,
  SSLCertificate,
  ActivityLog,
  DNSSyncLog,
  User,
  Notification
} from './models/index.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import notificationRoutes from "./routes/notificationRoutes.js"
import {runAllJobs} from "./cron/runAllJobs.js"
dotenv.config();

const app=express();
const PORT = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("DNS Management System backend is running");
});


app.use("/api/auth", authRoutes);

app.use("/api/users",userRoutes)

app.use("/api/admin",adminOnlyRoutes)

app.use('/api/companies', companyRoutes)

app.use("/api/vendors",vendorRoutes)

app.use("/api/control-panels",controlPanelRoutes)

app.use("/api/cost-centers",costCenterRoutes)

app.use("/api/domains",domainRoutes)

app.use("/api/records",dnsRoutes)

app.use("/api/activity-logs",activityLogRoutes)

app.use("/api",SSLCerticateRoutes)

app.use("/api", dnsSyncLogRoutes)

app.use("/api/dns-change-logs",dnsChangeLogRoutes)

app.use("/api/dashboard", dashboardRoutes)

app.use("/api/notifications", notificationRoutes)

const startServer = async () => {
  await connectDB();

  // IMPORTANT: do NOT use force:true if table already exists
  await sequelize.sync();

  console.log("Tables synced ✅");

  //runAllJobs()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
};

startServer();
