import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDBs from './config/db.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
    'http://localhost:5173',
    'http://creaturesanctuary.psoteropulos.com',
    'https://creaturesanctuary.psoteropulos.com',
    'http://restaurantwrangler.psoteropulos.com',
    'https://restaurantwrangler.psoteropulos.com',
    'https://anotherdomain.com',
    // ... more origins
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    // Additional CORS options if needed
};

app.use(express.json(), cors(corsOptions));

const startServer = async () => {
    await connectDBs(); // Ensure all DB connections are established first

    // Dynamically import routes after DB connections are established
    const creatureRouterModule = await import('./CreatureSanctuary/routes/creature.routes.js');
    app.use('/api', creatureRouterModule.default);

    const restaurantRouterModule = await import('./RestaurantWrangler/routes/restaurant.routes.js');
    app.use('/api', restaurantRouterModule.default);

    // After all asynchronous setup is complete, start listening for requests
};

startServer()
    .then(() => {
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
    })
    .catch(console.error);