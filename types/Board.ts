import { ObjectId } from 'mongoose';

export interface Board {
  _id: string;
  grid: string[][]; // You can specify the type of the inner array items if needed
  crosses: number[][]; // Same here
  equals: number[][]; // Same here
  date: string;
}

export interface BoardMongo {
  _id: ObjectId;
  grid: string[][]; // You can specify the type of the inner array items if needed
  crosses: number[][]; // Same here
  equals: number[][]; // Same here
  date: string;
}

export interface BoardGrid {
  _id: string;
  grid: string[]; // You can specify the type of the inner array items if needed
  crosses: number[][]; // Same here
  equals: number[][]; // Same here
  date: string;
}