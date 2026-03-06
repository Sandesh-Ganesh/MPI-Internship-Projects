import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import adminOnlyRoutes from './routes/adminOnlyRoutes.js'

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

const startServer = async () => {
  await connectDB();

  // IMPORTANT: do NOT use force:true if table already exists
  await sequelize.sync({ alter: true });

  console.log("Tables synced ✅");

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} 🚀`);
  });
};

startServer();

app.listen(PORT,()=>{
    console.log(`Server is listenig at port number ${PORT}`)
})
