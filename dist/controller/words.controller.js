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
exports.addWords = exports.getWord = void 0;
const words_service_1 = require("../service/words.service");
const getWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let word;
    const mode = req.query.mode;
    switch (mode) {
        case "today":
            word = yield (0, words_service_1.getWordOfTheDay)();
            break;
        case "random":
            word = yield (0, words_service_1.getRandomWord)();
            break;
        default:
            word = null;
    }
    return res.status(200).json(word);
});
exports.getWord = getWord;
const addWords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (req.body.hasOwnProperty("word") && typeof req.body.word === "string") {
        const word = req.body.word;
        switch (true) {
            case word.length < 5:
                return res.status(200).send("Word is less than 5 characters!");
            case word.length > 5:
                return res.status(200).send("Word is more than 5 characters!");
            case word.length === 5:
                return (0, words_service_1.insertNewWord)(word.toLowerCase()).then(() => res.status(200).send(`"${word}" successfully added!`));
        }
    }
    else if (req.body.hasOwnProperty("words") &&
        Array.isArray(req.body.words)) {
        const words = req.body.words;
        return Promise.all(words.map((word) => {
            if (typeof word !== "string" || word.length !== 5)
                return;
            return new Promise((resolve, reject) => (0, words_service_1.insertNewWord)(word.toLowerCase()).then((doc) => resolve(doc)));
        })).then(() => res.status(200).send("Successfully added words!"));
    }
    else {
        return res.status(200).send("Invalid field and/or value!");
    }
});
exports.addWords = addWords;
