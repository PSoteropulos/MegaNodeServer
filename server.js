import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDBs from './config/db.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json(), cors({ origin: 'http://localhost:5173' }));

const startServer = async () => {
    await connectDBs(); // Ensure all DB connections are established first

    // Dynamically import routes after DB connections are established
    const creatureRouterModule = await import('./CreatureSanctuary/routes/creature.routes.js');
    app.use('/api', creatureRouterModule.default);

    // Assuming there are more routes to import, repeat the pattern:
    // const anotherRouterModule = await import('./path/to/another/routes.js');
    // app.use('/api/anotherPath', anotherRouterModule.default);

    // After all asynchronous setup is complete, start listening for requests
};

startServer()
    .then(() => {
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
    })
    .catch(console.error);