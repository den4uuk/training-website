import express from 'express';
import hedgehogsRouter from './routes/hedgehogs.js';

const app = express();
app.use(express.json());

app.use('/api/hedgehogs', hedgehogsRouter);

export default app;