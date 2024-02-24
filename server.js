import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDBs from './config/db.config.js';
import bookRouter from './routes/book.routes.js';
import app2Router from './routes/app2.routes.js';
import app3Router from './routes/app3.routes.js';

dotenv.config();

const startServer = async () => {
    // First, establish all database connections
    await connectDBs();

    // Once DB connections are established, set up the Express app
    const app = express();
    const PORT = process.env.PORT;

    app.use(express.json(), cors({origin: 'http://localhost:5173'}));

    // Use routers
    app.use('/api/books', bookRouter);
    app.use('/api/app2', app2Router); // Example path for app2
    app.use('/api/app3', app3Router); // Example path for app3

    // Start listening for requests
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
};

startServer().catch(console.error);