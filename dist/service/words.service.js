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
exports.insertNewWord = exports.getRandomWord = exports.getWordOfTheDay = exports.countWords = void 0;
const word_today_model_1 = __importDefault(require("../model/word.today.model"));
const words_model_1 = __importDefault(require("../model/words.model"));
const countWords = () => {
    return words_model_1.default.estimatedDocumentCount();
};
exports.countWords = countWords;
const getWordOfTheDay = () => __awaiter(void 0, void 0, void 0, function* () {
    return word_today_model_1.default.findOne().then((result) => result);
});
exports.getWordOfTheDay = getWordOfTheDay;
const getRandomWord = () => __awaiter(void 0, void 0, void 0, function* () {
    return words_model_1.default.aggregate([
        {
            $sample: {
                size: 1,
            },
        },
    ]).then((results) => results[0]);
});
exports.getRandomWord = getRandomWord;
const insertNewWord = (word) => __awaiter(void 0, void 0, void 0, function* () {
    return words_model_1.default.findOne({ word }).then((results) => {
        if (!results) {
            const newWord = new words_model_1.default({
                word,
                lastUsed: null,
            });
            return newWord.save();
        }
    });
});
exports.insertNewWord = insertNewWord;
