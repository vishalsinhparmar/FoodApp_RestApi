import dotenv from 'dotenv';
import express, { urlencoded }  from 'express';
import cors from 'cors'
import dbConnection from './src/db.js';
import adminRoutes from './src/routes/admin/Addcategory.js';
import cartRoutes from './src/routes/cart/cart.js';
import authRoutes from './src/routes/auth/user.js';
import adminauthRoutes from './src/routes/auth/admin.js';

// import dbConnection from './src/db';
const app = express();
dotenv.config({path:'./.env'});

// frontend URl

const FRONTEND_URI = process.env.NODE_ENV === 'production' 
  ? process.env.FRONTEND_URI
  : process.env.FRONTEND_URI_LOCAL;

// alloworigin for cors
  const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [FRONTEND_URI] 
  : ["http://localhost:5173"];


// cors options
const corsOptions = {
     origin:allowedOrigins,
     methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
     allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
     credentials: true, // Allow credentials like cookies or authorization headers
   };
   

   
app.use(cors(corsOptions));
app.use(urlencoded({extended:true}));
app.use(express.json());
app.use('/api/admin',adminRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/adminauth',adminauthRoutes);
app.use('/api/auth',authRoutes);

dbConnection()
app.get('/',(req,res)=>{
     res.send('this is my react app')
});



app.listen(process.env.PORT,()=> console.log(`the app is http://localhost:${8000}`))