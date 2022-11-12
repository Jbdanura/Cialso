import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [menu,setMenu] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="navbar">
        <p className="navbar-home" onClick={()=>{navigate("/")}}>Home</p>
        <div className={!menu ? "navbar-bar" : "mobile-navbar"}>
          <div className="navbar-search">
              <input type="text" placeholder='Search person...'></input>
              <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg></button>
          </div>
          <button className="close" onClick={()=>{setMenu(false)}}>X</button>
        </div>
        <div className="navbar-profile"><img onClick={()=>{navigate("/user")}} className="avatar" src="/user.png"/></div>
        <div className="menu" onClick={()=>setMenu(true)}>
          Menu
        </div>
    </div>
  )
}

export default Navbar