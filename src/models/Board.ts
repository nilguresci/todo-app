import { Task } from "./Task";

export type Board = {
  id?: string;
  order?: number;
  title: string;
  tasks: Task[];
};

export type Test = {
  [key: string]: {
    id: string;
    content: string;
  }[];
};
