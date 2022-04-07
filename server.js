import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import usersModule from './routes/users.js';
import registerModule from './routes/register.js';
import loginModule from './routes/login.js';


const app = express();

mongoose.connect(process.env.DB_URL, {useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', ()=>console.log('Connected to Database'));

app.use(express.json());

app.use('/users', usersModule);
app.use('/register', registerModule);
app.use('/login', loginModule);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log('Server has started'));