import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js'
import adminOnlyRoutes from './routes/adminOnlyRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js'
import controlPanelRoutes from './routes/controlPanelRoutes.js'
import costCenterRoutes from './routes/costCenterRoutes.js';

dotenv.config();

const app=express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("DNS Management System backend is running");
});


app.use("/api/auth", authRoutes);

app.use("/api/admin",adminOnlyRoutes)

app.use('/api/company', companyRoutes)

app.use("/api/vendors",vendorRoutes)

app.use("/api/controlPanels",controlPanelRoutes)

app.use("/api/costCenters",costCenterRoutes)

const startServer = async () => {
  await connectDB();

  // IMPORTANT: do NOT use force:true if table already exists
  await sequelize.sync();

  console.log("Tables synced ✅");

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} 🚀`);
  });
};

startServer();

app.listen(PORT,()=>{
    console.log(`Server is listenig at port number ${PORT}`)
})
