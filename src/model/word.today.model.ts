import mongoose from "mongoose";

export interface WordToday {
  word: string;
  lastUsed: Date | null;
}

const wordTodaySchema = new mongoose.Schema<WordToday>(
  {
    word: String,
    lastUsed: Date,
  },
  {
    collection: "word.today",
    timestamps: true,
  }
);

const WordTodayModel = mongoose.model<WordToday>("word.today", wordTodaySchema);

export default WordTodayModel;