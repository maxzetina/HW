import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Assignments from './components/Assignments';
import Home from './components/Home'
import Navbar from './components/Navbar';
import { Stack } from "@fluentui/react";

function App() {
  return (
    <Stack>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/assignments" element={<Assignments />} />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
}

export default App;
