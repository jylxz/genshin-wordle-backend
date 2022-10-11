"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const wordsSchema = new mongoose_1.default.Schema({
    word: String,
    lastUsed: Date
}, {
    collection: "words",
    timestamps: true
});
const WordsModel = mongoose_1.default.model("words", wordsSchema);
exports.default = WordsModel;
