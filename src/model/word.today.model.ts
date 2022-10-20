import mongoose from "mongoose";

export interface WordToday {
  word: string;
}

const wordTodaySchema = new mongoose.Schema<WordToday>(
  {
    word: String,
  },
  {
    collection: "word.today",
    timestamps: true,
  }
);

const WordTodayModel = mongoose.model<WordToday>("word.today", wordTodaySchema);

export default WordTodayModel;
