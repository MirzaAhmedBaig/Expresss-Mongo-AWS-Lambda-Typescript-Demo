import express from 'express';
import bodyParser from 'body-parser';
import { router } from '../routes';
import helmet from 'helmet';
import dbConnection from '../configs/dbConnection'
import mongoConnect from '../configs/dbConnection';
// import cors from 'cors'

const app = express();

//connect mongoose
mongoConnect()

//setting up middleware
app.use(helmet());
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);

export = app;