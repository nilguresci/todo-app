import { get, query, ref, update } from "firebase/database";
import { Task } from "../models/Task";
import { db } from "../../Firebase";
import { boardService } from "./board.service";

const createTask = async (task: Task, boardId: string) => {
  task.id = new Date().getTime().toString();
  const board = await boardService.getBoard(boardId);
  board.tasks ? board.tasks.push(task) : (board.tasks = [task]);
  boardService.editBoard(board);
};

const getTasks = async (boardId: string) => {
  const tasksRef = ref(db, `Boards/${boardId}/tasks`);
  const data = await get(query(tasksRef));
  const tasks: Task[] = [];
  data.forEach((task) => {
    tasks.push({ ...task.val(), id: task.key });
  });

  return tasks;
};

const editTask = async (boardId: string, task: Task, index: number) => {
  const board = await boardService.getBoard(boardId);

  board.tasks[index] = task;

  update(ref(db, `Boards/${boardId}`), board);
};

export const taskService = {
  getTasks,
  createTask,
  editTask,
};
