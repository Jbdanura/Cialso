import './App.css';
import React,{useState} from "react"
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  const [user,setUsername] = useState(true)

  return (
    <div className="App">
      {!user ? <Login></Login> : 
      <Navbar/>
      }

    </div>
  );
}

export default App;
