import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Assignments from './components/Assignments';
import Home from './components/Home'
import Navbar from './components/Navbar';
import Sidenav from './components/Sidenav';

function App() {
  return (
    <div>
      <Navbar />
      <Sidenav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/assignments" element={<Assignments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
