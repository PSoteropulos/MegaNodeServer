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
const connections = {}; // connections object outside of function so we can access then in each model

const connectDBs = async () => {
    const connectionPromises = Object.entries(DB_CONFIG).map(async ([key, { uri, dbName }]) => {
        try {
            const connection = mongoose.createConnection(uri, {
                dbName
            });

            // Await connection to be ready
            await new Promise((resolve, reject) => {
                connection.once('open', resolve);
                connection.on('error', (err) => {
                    console.error(`Connection error on database ${dbName}:`, err);
                    reject(err); // Reject the promise on connection error
                });
            });

            console.log(`Successful connection to MongoDB database ${dbName}.`);
            connections[key] = connection; // Store the connection using the app identifier
        } catch (error) {
            console.error(`Failed to connect to ${dbName}:`, error);
            throw error; // Rethrow to be caught by the outer catch block
        }
    });

    // Wait for all connections to be established
    await Promise.all(connectionPromises);
    console.log("All databases connected successfully.");
};

// Function to retrieve a specific database connection by app identifier
export const getDBConnection = (appName) => {
    if (!connections[appName]) {
        throw new Error(`Database connection for ${appName} is not established.`);
    }
    return connections[appName];
};

export default connectDBs;