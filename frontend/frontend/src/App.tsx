import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./router";

const App: React.FC<{}> = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
