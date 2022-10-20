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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./database/connect"));
const words_routes_1 = __importDefault(require("./routes/words.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json({ type: "application/json" }));
app.use((0, cors_1.default)());
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`App is running on Port ${port}`);
    yield (0, connect_1.default)();
    (0, words_routes_1.default)(app);
}));
