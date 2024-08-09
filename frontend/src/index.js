import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createContext } from "react";
import { BrowserRouter } from 'react-router-dom';

export const Context=createContext({isAuthorized:false});

const AppWrapper=()=>{
   const[isAuthorized,setIsAuthorized]=useState(false);
   const[user,setUser]=useState({});

   return(
    <Context.Provider value={{isAuthorized,setIsAuthorized,user,setUser}}>
    <App />
    </Context.Provider>
   )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
