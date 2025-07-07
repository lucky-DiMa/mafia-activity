import mongoose from 'mongoose';
import {config} from "../config";

export const connectToMongo = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongo.link);
        console.log('⚡️[database]: MongoDB connected successfully');
    } catch (error) {
        console.error('⚡️[database]: Could not connect to MongoDB', error);
        process.exit(1);
    }
};