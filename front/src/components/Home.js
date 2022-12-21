import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Publish from './Publish'

const Home = ({baseUrl}) => {
  const navigate = useNavigate()
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
  
  if(!user){
    return null
  }
  return (
    <div className="home">
        <p className="discover" onClick={()=>navigate("/discover")}>Discover new people</p>
        <Publish baseUrl={baseUrl}/>
    </div>
  )
}

export default Home