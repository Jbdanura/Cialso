import './App.css';
import React,{useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Navbar from './components/Navbar';
import User from './components/User';
import Home from './components/Home';
import Discover from './components/Discover';

function App() {
  const [user,setUser] = useState(false)
  const baseUrl = "http://localhost:3001/"

  return (
    <div className="App">
      <BrowserRouter>
      {!user ? <Login baseUrl={baseUrl} setUser={setUser}></Login> : 
      <Navbar user={user}/>
      }
      <Routes>
        <Route path="/" element={<Home baseUrl={baseUrl} user={user}/>}/>
        <Route path="/:username" element={<User baseUrl={baseUrl} user={user}/>}/>
        <Route path="/discover" element={<Discover baseUrl={baseUrl} user={user}/>}/>
      </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
