import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { get } from './utilities';

function App() {

  const [example, setExample] = useState('')
  const [emp, setEmp] = useState([])

  useEffect(() => {
      get("https://trying-maxzetina.vercel.app/api/hello").then((r) => {
        console.log(r);
        setExample(r)});
      get("https://trying-maxzetina.vercel.app/api/emps", {name: 'Max'}).then((r) => {
          console.log(r);
          setEmp(r.map((r, key) => 
        <p key={key}>{r.name}, {r.level}</p> 
        ))
      });
      // const response = await fetch("/hi/");
      // console.log(response.clone().json());

      // if (!response.ok) {
      //   const message = `An error occured: ${response.statusText}`;
      //   window.alert(message);
      //   return;
      // }

      // const records = await response.json();
      // setRecords(records);
    }, []);

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
      </header>
    </div>
  );
}

export default App;
