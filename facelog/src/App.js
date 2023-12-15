import MainRoutes from "./Routes";
import "./App.css";
import { MyContext } from "./MyContext";
import { useState, React } from "react";
function App() {
  const [text, setText] = useState([]);

  return (
    <>
      <MyContext.Provider value={{ text, setText }}>
        <MainRoutes />
      </MyContext.Provider>
    </>
  );
}

export default App;
