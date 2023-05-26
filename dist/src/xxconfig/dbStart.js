"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const env_1 = require("./env");
mongoose_1.default.Promise = bluebird_1.default;
mongoose_1.default.set('debug', !env_1.env.production);
const mongoConnection = mongoose_1.default.connect(env_1.env.mongodb.uri);
mongoConnection.then(db => console.log('\x1b[36m%s\x1b[0m', 'MongoDB successfully connected'), err => console.log('\x1b[33m%s\x1b[0m', 'Error while connecting to mongodb: ', err));
exports.default = {
    MongoConnection: mongoConnection
};
