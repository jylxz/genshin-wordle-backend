import { NextFunction, Request, Response } from "express";
import { WordToday } from "../model/word.today.model";
import { Words } from "../model/words.model";
import {
  getWordOfTheDay,
  getRandomWord,
  insertNewWord,
} from "../service/words.service";

export const getWord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let word: Words | WordToday | null;
  const mode = req.query.mode;

  switch (mode) {
    case "today":
      word = await getWordOfTheDay();
      break;
    case "random":
      word = await getRandomWord();
      break;
    default:
      word = null;
  }

  return res.status(200).json(word);
};

export const addWords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  if (req.body.hasOwnProperty("word") && typeof req.body.word === "string") {
    const word = req.body.word as string;

    switch (true) {
      case word.length < 5:
        return res.status(200).send("Word is less than 5 characters!");
      case word.length > 5:
        return res.status(200).send("Word is more than 5 characters!");
      case word.length === 5:
        return insertNewWord(word.toLowerCase()).then(() =>
          res.status(200).send(`"${word}" successfully added!`)
        );
    }
  } else if (
    req.body.hasOwnProperty("words") &&
    Array.isArray(req.body.words)
  ) {
    const words = req.body.words as string[];

    return Promise.all(
      words.map((word) => {
        if (typeof word !== "string" || word.length !== 5) return;

        return new Promise((resolve, reject) =>
          insertNewWord(word.toLowerCase()).then((doc) => resolve(doc))
        );
      })
    ).then(() => res.status(200).send("Successfully added words!"));
  } else {
    return res.status(200).send("Invalid field and/or value!");
  }
};
