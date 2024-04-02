import mongoose from 'mongoose';

export async function connectDB() {
try {
    mongoose.connect(process.env.MONOGO_URL!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
        console.log('MongoDb  is connected');
    
    })

    connection.on('error', () => {
        console.log('mongodb connection error, please make sure db is running')
        process.exit(1);
    })


    
} catch (error) {
    console.log('something went wrong in connecting db ', error); 
}

}