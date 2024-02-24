import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Organized configuration for database connections
const DB_CONFIG = {
    creatureDB: { uri: process.env.CREATURE_DB_URI, dbName: process.env.CREATURE_DB_NAME },
    movieDB: { uri: process.env.MOVIE_DB_URI, dbName: process.env.MOVIE_DB_NAME },
    restaurantDB: { uri: process.env.RESTAURANT_DB_URI, dbName: process.env.RESTAURANT_DB_NAME },
};

// Asynchronously connect to all databases and store connections
// mongoose.connect is for setting a DEFAULT db, but we use mongoose.createConnection instead since we have multiple dbs
const connectDBs = async () => {
    const connections = {};
    for (const [key, { uri, dbName }] of Object.entries(DB_CONFIG)) {
        const thisConnection = await mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName,
        });
        console.log(`Successful connection to MongoDB database ${dbName}.`);
        connections[key] = thisConnection; // Store the connection using the app identifier
    }
    return connections;
};

// Function to retrieve a specific database connection by app identifier
export const getDBConnection = (appName) => {
    if (!connections[appName]) {
        throw new Error(`Database connection for ${appName} is not established.`);
    }
    return connections[appName];
};

export default connectDBs;