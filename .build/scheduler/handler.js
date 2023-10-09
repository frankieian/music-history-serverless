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
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulerHandler = void 0;
const adapter_1 = require("./lib/adapter");
const schedulerHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Scheduler runned!");
        yield (0, adapter_1.schedulerAdapter)();
    }
    catch (err) {
        console.log(err);
        throw new Error('Message could not be completely processed');
    }
});
exports.schedulerHandler = schedulerHandler;
