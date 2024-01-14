import { Task } from "./Task";

export type Board = {
  id?: string;
  order?: number;
  title: string;
  tasks: Task[];
};
