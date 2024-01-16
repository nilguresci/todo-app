import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import "./App.css";
import { useEffect, useState } from "react";
import { Deneme } from "./models/Board";
import { FaPlus } from "react-icons/fa";
import Board from "./components/Board/Board";
import { onValue, ref } from "firebase/database";
import { db } from "../Firebase";
import { boardService } from "./services/board.service";
import BoardModal from "./components/BoardModal/BoardModal";

const query = ref(db, "Boards");
const App = () => {
  const [data, setData] = useState<Deneme>({});
  const [boardModalVisible, setBoardModalVisible] = useState(false);

  // a little function to help us with reordering the result
  const reorder = (
    startIndex: number,
    endIndex: number,
    key: keyof typeof data
  ) => {
    const result = Array.from(data[key].tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const da = data;
    da[key].tasks = result;
    setData(da);
    boardService.editBoard(da[key]);
  };

  const move = (
    sourceKey: keyof typeof data,
    destinationKey: keyof typeof data,
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(data[sourceKey].tasks);
    const destClone = Array.from(data[destinationKey].tasks || []);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const da = data;
    da[sourceKey].tasks = sourceClone;
    da[destinationKey].tasks = destClone;
    setData(da);
    boardService.editBoard(da[sourceKey]);
    boardService.editBoard(da[destinationKey]);
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === result.destination.droppableId) {
      reorder(
        result.source.index,
        result.destination.index,
        result.source.droppableId as keyof typeof data
      );
    } else {
      move(
        result.source.droppableId as keyof typeof data,
        result.destination.droppableId as keyof typeof data,
        result.source,
        result.destination
      );
    }
  };

  useEffect(() => {
    return onValue(query, (snapshot) => {
      // realtime db nin dinlenmesi, dinliyor
      const val = snapshot.val(); //db nin snapshot yani anlık görüntüsünü alıyor ve valuesunu döndürüyor
      if (snapshot.exists()) {
        console.log("Data Changed", val);
        setData(val);
      }
    });
  }, []);

  const addBoard = () => {
    setBoardModalVisible(true);
  };

  return (
    <>
      <div className="pageHeader">
        <h2>Taskboard</h2>
      </div>
      <hr />
      <div className="addColumnContainer">
        <button
          type="button"
          className="addColumnBtn"
          onClick={() => addBoard()}
        >
          <FaPlus /> &nbsp; ADD COLUMN
        </button>
      </div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="container">
            {Object.keys(data).map((key: string) => (
              <Droppable droppableId={key}>
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot
                ) => (
                  <Board
                    provided={provided}
                    snapshot={snapshot}
                    data={data[key as keyof typeof data]}
                  />
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
        <BoardModal
          modalIsOpen={boardModalVisible}
          closeModal={() => setBoardModalVisible(false)}
        />
      </div>
    </>
  );
};

export default App;
