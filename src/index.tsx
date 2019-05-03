import * as React from "react";
import { render } from "react-dom";
import MyForm from "./MyForm";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <MyForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
