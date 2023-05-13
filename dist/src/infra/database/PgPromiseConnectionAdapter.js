"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class PgPromiseConnectionAdapter {
    constructor() {
        this.pgp = (0, pg_promise_1.default)()("postgres://" + process.env.POSTGRES_USER + ":" + process.env.POSTGRES_PASSWORD + "@" + process.env.POSTGRES_HOST + ":" + process.env.POSTGRES_PORT + "/" + process.env.POSTGRES_DATABASE);
    }
    static getInstance() {
        if (!PgPromiseConnectionAdapter.instance) {
            PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
        }
        return PgPromiseConnectionAdapter.instance;
    }
    query(statement, params) {
        return this.pgp.query(statement, params);
    }
}
exports.default = PgPromiseConnectionAdapter;
