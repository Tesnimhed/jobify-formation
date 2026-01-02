import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
const app = express();
import jobRouter from './routes/jobRouter.js';

app.use(express.json()); //middleware => req.body


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/jobs', jobRouter);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);          
});