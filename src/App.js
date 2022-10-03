import React from 'react';
import './App.css'
import Home from './Components/Home';
import { BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';

function App() {

  return (

    <div className='app'>
        
      <Router>
        <Navbar/>
         <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
         </Routes>
      </Router>

    </div>

  );

}

export default App;
