import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import connect from './config/dbconnection';

const app = express();
dotenv.config();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;
