"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
class FastifyAdapter {
    constructor() {
        this.app = (0, fastify_1.default)();
    }
    on(url, method, fn) {
        this.app[method](url, function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const output = yield fn(req.params, req.body);
                console.log(output);
                res.send(output);
            });
        });
    }
    listen(port) {
        this.app.listen({
            port,
            host: "0.0.0.0"
        }).then(() => {
            console.log(`🚀 App running on port: ${port} with Fastify`);
        });
    }
}
exports.default = FastifyAdapter;
