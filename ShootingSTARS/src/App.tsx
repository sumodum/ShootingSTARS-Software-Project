import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Modules from './Pages/Modules';
import Timetables from './Pages/Timetables';
import CreateAccount from './Pages/CreateAccount';
import Login from './Pages/Login';

import { setModules } from './Reducers/AllModulesReducer';
import { Module } from './Types/Module';
import { store } from './store';
import { useAppDispatch } from './hooks';
  
function App() {
  
  const dispatch = useAppDispatch();
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    if(store.getState().allModules.allModules.length == 0){
        fetch('ourData.json', {
          headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
        })
        .then((response) => response.json()) //parses as JS object
        .then((myJson) => {
          dispatch(setModules(Module.createModules(myJson)));
          setLoading(false);
        });
      
    }
    else{
      setLoading(false);
    }
  },[]);
  if(loading === true){
    return(<>Loading...</>);
  }
  else{
    return (
      <div className="home">
        <header>
          <Navbar/>
        </header>
        <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/timetables' element={<Timetables/>} />
          <Route path='/modules' element={<Modules/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/create' element={<CreateAccount/>} />
        </Routes>
      </Router>
      </div>
      
    );
  }
}
  
export default App;