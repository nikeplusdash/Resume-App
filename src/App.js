import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  console.log(process.env.REACT_APP_PASSWORD)
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
