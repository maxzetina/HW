import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { get } from './utilities';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrimaryButton } from '@fluentui/react';
import { NavBasicExample } from './components/Nav';
import Assignments from "./components/Assignments";
import Overview from "./components/Overview";
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />}/>
        <Route path="/assignments" element={<Assignments />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <div>
  //         {example.status}
  //         {emp}
  //       </div>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //       <PrimaryButton onClick={_alertClicked} text="Click Me"/>

  //       {/* {NavBasicExample()} */}
  //       <Router>
  //         <Overview path='/' />
  //         <Assignments path='/assignments' />
  //         {/* <NotFound default /> */}
  //       </Router>
  //     </header>
  //   </div>
  // );
}

export default App;
