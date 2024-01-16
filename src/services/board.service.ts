import { get, push, query, ref, set, update } from "firebase/database";
import { Board } from "../models/Board";
import { db } from "../../Firebase";

const boardRef = ref(db, "Boards");

const createBoard = async (board: Board) => {
  const newBoardRef = push(boardRef);
  board.id = newBoardRef.key || new Date().getTime().toString();

  set(newBoardRef, board);
};

const getBoards = async () => {
  const data = await get(query(boardRef));
  const boards: Board[] = [];

  data.forEach((board) => {
    boards.push({ ...board.val(), id: board.key });
  });

  return boards;
};

const getBoard = async (id: string) => {
  const boardRef = ref(db, `Boards/${id}`);
  const data = await get(boardRef);

  return data.val() as Board;
};

const editBoard = (board: Board) => {
  const boardRef = ref(db, `Boards/${board.id}`);
  update(boardRef, board);
};

const deleteBoard = async (id: string) => {
  const boardRef = ref(db, `Boards/${id}`);
  set(boardRef, null);
};

export const boardService = {
  createBoard,
  getBoards,
  editBoard,
  getBoard,
  deleteBoard,
};
