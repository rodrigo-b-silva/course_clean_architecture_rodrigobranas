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
const GetOrder_1 = __importDefault(require("../../application/useCase/getOrder/GetOrder"));
class GetOrderController {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
    }
    execute(params, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const getOrder = new GetOrder_1.default(this.repositoryFactory);
            const getOrderOutput = yield getOrder.execute(params.code);
            return getOrderOutput;
        });
    }
}
exports.default = GetOrderController;
