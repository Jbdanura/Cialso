import React from 'react'
import { useNavigate } from 'react-router-dom'
import Publish from './Publish'

const Home = ({baseUrl,user}) => {
  const navigate = useNavigate()
  if(!user){
    return null
  }
  return (
    <div className="home">
        <p className="discover" onClick={()=>navigate("/discover")}>Discover new people</p>
        <Publish baseUrl={baseUrl} user={user}/>
    </div>
  )
}

export default Home