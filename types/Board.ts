import { ObjectId } from 'mongoose';

type Move = [number, string, string];

export interface Board {
  _id: string;
  grid: string[]; // You can specify the type of the inner array items if needed
  crosses: number[][]; // Same here
  equals: number[][]; // Same here
  date: string;
  moves: Move[];
}

export interface BoardMongo {
  _id: ObjectId;
  grid: string[]; // You can specify the type of the inner array items if needed
  crosses: number[][]; // Same here
  equals: number[][]; // Same here
  date: string;
  moves: Move[];
}

export interface BoardGrid {
  grid: string[]; // You can specify the type of the inner array items if needed
  crosses: number[][]; // Same here
  equals: number[][]; // Same here
  activeCell: number;
  date: string;
}