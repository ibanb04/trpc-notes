import mongoose from 'mongoose';


export const dbConnect = async () => {

    try {
        const db = await mongoose.connect('mongodb://localhost/trpcdb');
        console.log('Database connected to', db.connection.name);

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}