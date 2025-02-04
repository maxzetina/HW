import './App.css';

import Assignments from './components/Assignments';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Navbar from './components/Nav/Navbar';
import { Stack } from "@fluentui/react";

import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();

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
