import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { db } from "../Firebase";
import { onValue, push, ref, set } from "firebase/database";
const query = ref(db, "Boards");

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("sa", query);
    console.log("as", db);
    const newPostRef = push(query);
    set(newPostRef, {
      order: 1,
      title: "First Board",
      tasks: [],
    });
    return onValue(query, (snapshot) => {
      // realtime db nin dinlenmesi, dinliyor
      const data = snapshot.val(); //db nin snapshot yani anlık görüntüsünü alıyor ve valuesunu döndürüyor
      console.log("n2", data);

      if (snapshot.exists()) {
        console.log(data);
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
