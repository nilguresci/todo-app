/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import "./App.css";
import { useState } from "react";
import { Test } from "./models/Board";
import { FaPlus } from "react-icons/fa";
import Board from "./components/Board/Board";

// fake data generator
const getItems = (count: number, itemName: string) =>
  Array.from({ length: count }, (_v, k) => k).map((k) => ({
    id: `${itemName}-${k}`,
    content: `${itemName} ${k}`,
  }));

const App = () => {
  const [data, setData] = useState<Test>({
    ahmet: getItems(10, "Ahmet"),
    nil: getItems(10, "Nil"),
    findik: getItems(10, "Fındık"),
    miuv: getItems(10, "Mi'uv"),
    pasa: getItems(10, "Paşa"),

    pagfhgfsa: getItems(10, "Pafghfghşa"),
  });

  // a little function to help us with reordering the result
  const reorder = (
    startIndex: number,
    endIndex: number,
    key: keyof typeof data
  ) => {
    const result = Array.from(data[key]);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setData((d) => ({
      ...d,
      [key]: result,
    }));
  };

  const move = (
    sourceKey: keyof typeof data,
    destinationKey: keyof typeof data,
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(data[sourceKey]);
    const destClone = Array.from(data[destinationKey]);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    setData((d) => ({
      ...d,
      [sourceKey]: sourceClone,
      [destinationKey]: destClone,
    }));
  };

  const onDragEnd = (result: DropResult) => {
    console.log("DragEnd result", result);
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

  return (
    <>
      <div className="pageHeader">
        <h2>Taskboard</h2>
      </div>
      <hr />
      <div className="addColumnContainer">
        <button type="button" className="addColumnBtn">
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
      </div>
    </>
  );
};

export default App;
