import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState, createContext } from "react";
import Register from "./Register";
import Login from "./Login";
import Summary from "./Summary";
import Detail from "./Detail";

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  return (
    <div>
    <store.Provider value={[token, setToken]}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={< Login />}></Route>
    <Route path='/register' element={< Register />}></Route>
    <Route path='/summary' element={< Summary />}></Route>
    <Route path='/detail/:id' element={< Detail />}></Route>
    </Routes>
    </BrowserRouter>
    </store.Provider>
    </div>
  )
}

export default App;