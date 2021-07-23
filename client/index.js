import "../public/style.css"
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";


ReactDOM.render(
    <BrowserRouter>
        <Route path="/home" component={Home} />
    </BrowserRouter>,
    document.getElementById('app') 
  );