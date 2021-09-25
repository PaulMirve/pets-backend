import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONN || "");
        console.log('Database online')
    } catch (error) {
        console.log(error);
        throw new Error('Error try to connecto to the database');
    }
}