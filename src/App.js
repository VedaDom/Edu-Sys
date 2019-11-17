import React from 'react';
import './App.css';
import { InputField } from "./components/core/InputField/InputField";

function App() {
  return (
    <div className="App">
      <InputField id="name" label="Name" type="number"/>
    </div>
  );
}

export default App;
