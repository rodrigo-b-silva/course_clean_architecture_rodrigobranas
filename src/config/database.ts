import dotenv from 'dotenv';

dotenv.config();

export default {
    production: false,
    mongodb: {
        uri: process.env.MONGO_HOST + ':' + process.env.MONGO_PORT,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    }
}