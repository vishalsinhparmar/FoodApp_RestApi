import dotenv from 'dotenv';
import express, { urlencoded }  from 'express';
import cors from 'cors'
import dbConnection from './src/db.js';
import adminRoutes from './src/routes/admin/Addcategory.js';
// import dbConnection from './src/db';
const app = express();
dotenv.config({path:'./.env'});

app.use(cors());
app.use(urlencoded());
app.use(express.json());
app.use('/api/admin',adminRoutes);

dbConnection()
app.get('/',(req,res)=>{
     res.send('this is my react app')
});



app.listen(process.env.PORT,()=> console.log(`the app is http://localhost:${8000}`))