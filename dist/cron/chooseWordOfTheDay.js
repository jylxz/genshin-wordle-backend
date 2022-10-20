"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_1 = __importDefault(require("../database/connect"));
const word_today_model_1 = __importDefault(require("../model/word.today.model"));
const words_model_1 = __importDefault(require("../model/words.model"));
function chooseWordOfTheDay() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config({
            path: "../../.env",
        });
        yield (0, connect_1.default)();
        yield word_today_model_1.default.deleteMany({});
        return words_model_1.default.aggregate([
            {
                $match: {
                    lastUsed: null,
                },
            },
            {
                $sample: {
                    size: 1,
                },
            },
        ])
            .then((docs) => __awaiter(this, void 0, void 0, function* () {
            if (docs.length > 0) {
                yield updateLastUsed(docs[0]._id);
                return insertNewWordToday(docs[0].word);
            }
            else {
                return words_model_1.default.find()
                    .sort({ lastUsed: 1 })
                    .limit(1)
                    .exec()
                    .then((docs) => __awaiter(this, void 0, void 0, function* () {
                    yield updateLastUsed(docs[0]._id);
                    return insertNewWordToday(docs[0].word);
                }));
            }
        }))
            .finally(() => {
            process.exit(1);
        });
    });
}
function updateLastUsed(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return words_model_1.default.findOneAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(id),
        }, {
            lastUsed: new Date(),
        });
    });
}
function insertNewWordToday(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const newWord = new word_today_model_1.default({
            word,
        });
        return newWord.save();
    });
}
chooseWordOfTheDay();
