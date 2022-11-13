import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const User = ({baseUrl,user}) => {
  const username = useParams().username
  const [userData,setUserData] = useState(null)

  useEffect(()=>{
    const getUserData = async() => {
      console.log(baseUrl+ `users/${username}`)
        axios.get(baseUrl+ `users/${username}`)
        .then(result=>setUserData(result.data))
    }
    getUserData()
    }
  ,[username])

  if (!user){
    return null
  } 
  console.log("userdata",userData,"username",username)
  return (
    <>
    {userData && userData.username == username ? 
        <div className="user-data">
        {userData.avatar ? <img className="avatar" src={`${baseUrl + userData.username}.png`}/> : 
        <img className="avatar" src={"/user.png"}/>}
        <div className="info">
          <p className="name">{userData.name} {userData.lastname}</p>
          <p className="username">{userData.username}</p>
        </div>
  
        </div> : null}
    </>

  )
}

export default User