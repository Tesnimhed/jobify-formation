import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
const app = express();
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose'; 
import {errorHandlerMiddleware} from './middlewares/errorHandlerMiddleware.js';

app.use(express.json()); //middleware => req.body
 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) => { 
  res.status(404).json({ msg: 'not found' }); 
}); 

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
try { 
  await mongoose.connect(process.env.MONGO_URL); 
  console.log('connected to mongoDB');
  app.listen(port, () => { 
    console.log(`server running on PORT ${port}....`); 
  }); 
} catch (error) { 
  console.log(error); 
  process.exit(1); 
} 