import * as React from "react";
import { render } from "react-dom";
import { MyForm, MyContainer } from "./MyForm";
import "./styles.css";

function App() {
  const [data, setData] = React.useState([
    [{ value: true }, { value: 1 }, { value: 2 }, { value: Date.now() }],
    [{ value: true }, { value: 4 }, { value: 4 }, { value: Date.now() }],
    [{ value: true }, { value: 7 }, { value: 3 }, { value: Date.now() }],
    [{ value: true }, { value: 10 }, { value: 1 }, { value: Date.now() }]
  ]);
  const [submittedData, setSubmittedData] = React.useState(null);

  const onSubmit = stuff => {
    console.log(stuff);
    setSubmittedData(stuff);
  };

  return (
    <div className="App">
      <MyContainer>
        <MyForm handleSubmit={onSubmit} data={data} />
      </MyContainer>
      <pre>{JSON.stringify(submittedData, null, 2)}</pre>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
