import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app=express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("DNS Management System backend is running");
});

app.listen(PORT,()=>{
    console.log(`Server is listenig at port number ${PORT}`)
})

