import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Discover = ({baseUrl,user}) => {
  const [users,setUsers] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    const getUsers = async () => {
      axios.get(`${baseUrl}users/all`).then(result=>setUsers(result.data))
    }
    getUsers()
  }
  ,[])
  if(!user){
    navigate("")
    return null
  }
  return (
    <>
    {users ? 
        <div className="discover-container">
        {users.map((user,i)=>{
          return <div className="discover-user" onClick={()=>navigate(`/${user.username}`)} key={i}>
            {user.avatar ? <img className="discover-avatar" src={`${baseUrl + user.username}.png`}/> 
            : <img className="discover-avatar" src={"/user.png"}/>}
            <div className="discover-user-info">
              <p className="discover-name">{user.name} {user.lastname}</p>
              <p className="discover-username">{user.username}</p>
            </div>
          </div>
        })}
    </div> : null}
    </>

  )
}

export default Discover