import express, { response, Router } from 'express';
// import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import route from './router/router.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import request from 'request';

const app = express();
const PORT=9000
// const url = "http://api.openweathermap.org/data/2.5/weather?q=pune&appid=a25864b6917859e23269883fe62334a8";
// request(url,(error , response , body)=>{
//      const data =JSON.parse(body)
//     console.log(body);
// })

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/users',route);

// const url = "api.openweathermap.org/data/2.5/weather?q=indore&appid=a25864b6917859e23269883fe62334a8";
// request(url,(error , response , body)=>{
//     const data =JSON.parse(body)
//     console.log();
// })

mongoose.connect("mongodb://localhost:27017/weather",{useNewUrlParser:true ,useUnifiedTopology:true})
.then(()=>console.log("connections successfull"))
.catch((err)=> console.log(err));



app.listen(PORT ,()=>{
    console.log(`server on ${PORT}`);
})