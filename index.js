import dotenv from 'dotenv';
import express, { urlencoded }  from 'express';
import cors from 'cors'
const app = express();
dotenv.config({path:'./.env'});

app.use(cors());
app.use(urlencoded());
app.use(express.json());

app.get('/',(req,res)=>{
     res.send('this is my react app')
});


app.listen(process.env.PORT,()=> console.log('the app is http://localhost:4000'))