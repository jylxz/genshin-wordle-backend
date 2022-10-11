import { Express } from "express";
import { addWords, getWord } from "../controller/words.controller";

export default function wordsRoutes(app: Express) {
  app.get("/words", getWord);

  app.post("/words", addWords);
}
