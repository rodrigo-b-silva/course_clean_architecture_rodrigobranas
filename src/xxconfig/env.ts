import dotenv from 'dotenv';

dotenv.config();

export const env = {
    env: process.env.ENV,
    production: process.env.ENV === "production",
    mongodb: {
        uri: process.env.MONGO_HOST + ':' + process.env.MONGO_PORT,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    }
}