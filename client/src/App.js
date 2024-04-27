import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/chats" Component={Chat} />
      </Routes>
    </div>
  );
}

export default App;
