import './App.css';
import React,{useState} from "react"
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  const [user,setUser] = useState(false)
  const baseUrl = "http://localhost:3001/"
  return (
    <div className="App">
      {!user ? <Login baseUrl={baseUrl}></Login> : 
      <Navbar/>
      }

    </div>
  );
}

export default App;
