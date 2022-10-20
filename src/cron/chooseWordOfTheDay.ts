import * as dotenv from "dotenv";
import mongoose from "mongoose";
import connect from "../database/connect";
import WordTodayModel from "../model/word.today.model";
import WordsModel, { Words } from "../model/words.model";

async function chooseWordOfTheDay() {
  dotenv.config({
    path: "../../.env",
  });

  await connect();

  await WordTodayModel.deleteMany({});

  return WordsModel.aggregate<Words>([
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
    .then(async (docs) => {
      if (docs.length > 0) {
        await updateLastUsed(docs[0]._id);

        return insertNewWordToday(docs[0].word);
      } else {
        return WordsModel.find()
          .sort({ lastUsed: 1 })
          .limit(1)
          .exec()
          .then(async (docs) => {
            await updateLastUsed(docs[0]._id);

            return insertNewWordToday(docs[0].word);
          });
      }
    })
    .finally(() => {
      process.exit(1);
    });
}

async function updateLastUsed(id: string) {
  return WordsModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    {
      lastUsed: new Date(),
    }
  );
}

async function insertNewWordToday(word: string) {
  const newWord = new WordTodayModel({
    word,
  });

  return newWord.save();
}

chooseWordOfTheDay();
