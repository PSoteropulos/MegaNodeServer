import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDBs from './config/db.config.js';
import bookRouter from './routes/book.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', bookRouter);

const startServer = async () => {
    await connectDBs(); // This initializes all database connections
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
};

startServer().catch(console.error);