import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({user,setUser}) => {
  const [menu,setMenu] = useState(false)
  const navigate = useNavigate()
  const [userToSearch,setUserToSearch] = useState("")
  const logOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const searchUser = (event) => {
    event.preventDefault()
    navigate(`/${userToSearch}`)
  }

  return (
    <div className="navbar">
        <p className="navbar-home" onClick={()=>{navigate("/")}}>Home</p>
        <div className={!menu ? "navbar-bar" : "mobile-navbar"}>
            <form className="navbar-search" onSubmit={(event)=>searchUser(event)}>
              <input type="text" onChange={(event)=>setUserToSearch(event.target.value)} value={userToSearch} placeholder='Search person...'></input>
              <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg></button>
            </form>
          <button className="close" onClick={()=>{setMenu(false)}}>X</button>
        </div>
        <div className="navbar-profile">
          <img onClick={()=>{navigate(`/${user.username}`)}} className="avatar" src="/user.png"/>
          <svg onClick={()=>logOut()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out logout"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </div>
        <div className="menu" onClick={()=>setMenu(true)}>
          Menu
        </div>
    </div>
  )
}

export default Navbar