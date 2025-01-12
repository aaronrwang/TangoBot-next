import mongoose, { Schema, Document } from 'mongoose';
import { Board as BoardType } from '../../types/Board';

const boardSchema = new Schema<BoardType>({
  grid: [Array],
  crosses: [Array],
  equals: [Array],
  date: String,
});

const Board = mongoose.models.Board || mongoose.model('Board', boardSchema, 'Boards');

export default Board;