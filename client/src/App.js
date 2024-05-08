import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Chat from "../src/pages/Chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/chats" Component={Chat} />
      </Routes>
    </div>
  );
}

export default App;
