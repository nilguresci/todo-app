import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { db } from "../Firebase";
import { onValue, ref } from "firebase/database";
import { boardService } from "./services/board.service";
import { taskService } from "./services/task.service";
const query = ref(db, "Boards");

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // boardService.createBoard({ tasks: [], title: "third board" });
    // boardService.editBoard({
    //   order: 2,
    //   title: "edit Board",
    //   id: "-No6XnDs0nCsCUGmZzF5",
    //   tasks: [],
    // });
    // boardService.getBoard("-No6mAovjF6X8f8rP4Ds");
    // boardService.deleteBoard("-No6Xpjx10Zjaf5HD2j6");
    // boardService.orderBoards();
    boardService.getBoards();
    // taskService.createTask({ title: "Test Deneme" }, "-No75-MNl-5yv6ZO1chg");
    // taskService.getTasks("-No75-MNl-5yv6ZO1chg");
    return onValue(query, (snapshot) => {
      // realtime db nin dinlenmesi, dinliyor
      const data = snapshot.val(); //db nin snapshot yani anlık görüntüsünü alıyor ve valuesunu döndürüyor

      if (snapshot.exists()) {
        console.log("Data Changed", data);
      }
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
