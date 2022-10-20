"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const wordTodaySchema = new mongoose_1.default.Schema({
    word: String,
}, {
    collection: "word.today",
    timestamps: true,
});
const WordTodayModel = mongoose_1.default.model("word.today", wordTodaySchema);
exports.default = WordTodayModel;
