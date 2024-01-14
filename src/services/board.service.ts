import {
  get,
  orderByChild,
  push,
  query,
  ref,
  set,
  update,
} from "firebase/database";
import { Board } from "../models/Board";
import { db } from "../../Firebase";
import { Task } from "../models/Task";

const boardRef = ref(db, "Boards");

const createBoard = async (board: Board) => {
  const boards = await getBoards();
  board.order = boards.length;
  const newBoardRef = push(boardRef);
  board.id = newBoardRef.key!;

  set(newBoardRef, board);
};

const getBoards = async () => {
  const data = await get(query(boardRef, orderByChild("order")));
  const boards: Board[] = [];

  data.forEach((board) => {
    const tasks: Task[] = [];
    board.child("tasks").forEach((task) => {
      tasks.push(task.val());
    });
    boards.push({ ...board.val(), id: board.key, tasks });
  });

  return boards;
};

const getBoard = async (id: string) => {
  const boardRef = ref(db, `Boards/${id}`);
  const data = await get(boardRef);
  const tasks: Task[] = [];

  data.child("tasks").forEach((task) => {
    tasks.push(task.val());
  });

  return { ...(data.val() as Board), id: data.key, tasks };
};

const editBoard = (board: Board) => {
  const boardRef = ref(db, `Boards/${board.id}`);
  update(boardRef, board);
};

const deleteBoard = async (id: string) => {
  const boardRef = ref(db, `Boards/${id}`);
  set(boardRef, null);
  await orderBoards();
};

const orderBoards = async () => {
  const boards = await getBoards();
  boards.forEach((board, index) => {
    if (board.order !== index) {
      editBoard({ ...board, order: index });
    }
  });
};

export const boardService = {
  createBoard,
  getBoards,
  editBoard,
  getBoard,
  deleteBoard,
  orderBoards,
};
