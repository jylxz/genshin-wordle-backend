import mongoose from "mongoose"

export interface Words {
  _id: string;
  word: string;
  lastUsed: Date | null
}

const wordsSchema = new mongoose.Schema<Words>(
  {
    word: String,
    lastUsed: Date
  },
  {
    collection: "words",
    timestamps: true
  }
)

const WordsModel = mongoose.model<Words>("words", wordsSchema)

export default WordsModel