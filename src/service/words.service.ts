import mongoose from "mongoose";
import WordTodayModel from "../model/word.today.model";
import WordsModel, { Words } from "../model/words.model";

export const countWords = () => {
  return WordsModel.estimatedDocumentCount();
};

export const getWordOfTheDay = async () => {
  return WordTodayModel.findOne().then((result) => result);
};

export const getRandomWord = async () => {
  return WordsModel.aggregate<Words>([
    {
      $sample: {
        size: 1,
      },
    },
  ]).then((results) => results[0]);
};

export const insertNewWord = async (word: string) => {
  return WordsModel.findOne({ word }).then((results) => {
    if (!results) {
      const newWord = new WordsModel({
        word,
        lastUsed: null,
      });

      return newWord.save();
    }
  });
};
