import { Task } from "./Task";

export type Board = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Test = {
  [key: string]: {
    id: string;
    content: string;
  }[];
};

export type Deneme = {
  [key: string]: Board;
};
