import { get, push, query, ref, set, update } from "firebase/database";
import { Task } from "../models/Task";
import { db } from "../../Firebase";
import { boardService } from "./board.service";

const createTask = async (task: Task, boardId: string) => {
  const tasksRef = ref(db, `Boards/${boardId}/tasks`);
  const board = await boardService.getBoard(boardId);
  //   const tasks = await getTasks(boardId);
  task.order = board.tasks ? board.tasks.length : 0;
  const newTaskRef = push(tasksRef);
  task.id = newTaskRef.key!;
  set(newTaskRef, task);
  //   boardService.editBoard(board);
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

const editTask = async (boardId: string, task: Task) => {
  // const board = await boardService.getBoard(boardId);
  const taskRef = ref(db, `Boards/${boardId}/tasks/${task.id}`);
  update(taskRef, task);
};

const orderTasks = async (boardId: string) => {
  const tasks = await getTasks(boardId);
  tasks.forEach((task, index) => {
    if (task.order !== index) {
      editTask(boardId, { ...task, order: index });
    }
  });
};
export const taskService = {
  getTasks,
  createTask,
  editTask,
  orderTasks,
};
