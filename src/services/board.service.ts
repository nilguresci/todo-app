import { get, push, ref, set, update } from "firebase/database";
import { Board } from "../models/Board";
import { db } from "../../Firebase";

const query = ref(db, "Boards");

const createBoard = async (board: Board) => {
  const boards = await getBoards();
  board.order = boards.length;
  const newBoardRef = push(query);
  set(newBoardRef, board);

  console.log("newBoardRef", newBoardRef.key);
};

const getBoards = async () => {
  const data = await get(query);
  const boards: Board[] = [];
  data.forEach((board) => {
    boards.push({ ...board.val(), id: board.key });
  });
  console.log("boards", boards);
  return boards;
};

const editBoard = (board: Required<Board>) => {
  const boardRef = ref(db, `Boards/${board.id}`);
  update(boardRef, board);
};
export const boardService = { createBoard, getBoards, editBoard };
