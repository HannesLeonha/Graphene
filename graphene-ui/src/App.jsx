import { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {addGameEventListener} from "./EventManager.js";

function App() {
  const [count, setCount] = useState(0);

  // Test for checking communication to game
  try {
    window.top.$dataSystem.gameTitle = "Figma?"
    window.top.Scene_Title.prototype.drawGameTitle();
  } catch(e) {
    console.log(e);
  }

  // Add game event listener
  addGameEventListener("IncreaseCounter", (args) => {
    console.log("Subscriber is working with args: ");
    console.log(args);

    setCount(count + (+args.amount));
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
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
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={() => {window.top.SceneManager.goto(window.top.Scene_Map)}}>
        Goto Map Scene
      </button>
    </>
  )
}

export default App
