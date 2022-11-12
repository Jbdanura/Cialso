import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({user}) => {
  const navigate = useNavigate()
  if(!user){
    return null
  }
  return (
    <div className="home">
        <p className="discover" onClick={()=>navigate("/discover")}>Discover new people</p>
    </div>
  )
}

export default Home