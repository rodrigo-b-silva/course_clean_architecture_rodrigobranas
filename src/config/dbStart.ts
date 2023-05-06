import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './database';

mongoose.Promise = bluebird;
mongoose.set('debug', !config.production);

const mongoConnection = mongoose.connect(config.mongodb.uri);
mongoConnection.then(
    db => console.log('\x1b[36m%s\x1b[0m', 'MongoDB successfully connected'),
    err => console.log('\x1b[33m%s\x1b[0m', 'Error while connecting to mongodb: ', err)
);

export default {
    MongoConnection: mongoConnection
}
