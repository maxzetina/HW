import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { get } from './utilities';

import { PrimaryButton } from '@fluentui/react';


function App() {

  const [example, setExample] = useState('')
  const [emp, setEmp] = useState([])

  useEffect(() => {
      get("/api/hello").then((r) => {
        console.log(r);
        setExample(r)});
      get("/api/emps", {name: 'Max'}).then((r) => {
          console.log(r);
          setEmp(r.map((r, key) => 
        <p key={key}>{r.name}, {r.level}</p> 
        ))
      });
    }, []);

    const _alertClicked = () => {
      alert('Clicked');
    };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {example.status}
          {emp}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <PrimaryButton onClick={_alertClicked} text="Click Me"/>
      </header>
    </div>
  );
}

export default App;
