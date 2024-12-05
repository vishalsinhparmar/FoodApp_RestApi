import express  from 'express';
const app = express();


app.get('/',(req,res)=>{
     res.send('this is my react app')
});


app.listen(4000,()=> console.log('the app is http://localhost:4000'))