import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';




function formatParams(params) {
  // iterate of all the keys of params as an array,
  // map it to a new array of URL string encoded key,value pairs
  // join all the url params using an ampersand (&).
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

// convert a fetch result to a JSON object with error handling for fetch and json errors
function convertToJSON(res) {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
  }

  return res
    .clone() // clone so that the original is still readable for debugging
    .json() // start converting to JSON object
    .catch((error) => {
      // throw an error containing the text that couldn't be converted to JSON
      return res.text().then((text) => {
        throw `API request's result could not be converted to a JSON object: \n${text}`;
      });
    });
}

// Helper code to make a get request. Default parameter of empty JSON Object for params.
// Returns a Promise to a JSON Object.
function get(endpoint, params = {}) {
  const fullPath = endpoint + "?" + formatParams(params);
  console.log(fullPath);
  return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw `GET request to ${fullPath} failed with error:\n${error}`;
    });
}








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
