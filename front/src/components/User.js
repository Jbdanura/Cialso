import React, { useEffect, useState } from 'react'
import axios from 'axios'

const User = ({baseUrl,user}) => {
  const [userData,setUserData] = useState()

  useEffect(()=>{
    console.log(user)
    const getUserData = async() => {
        await axios.get(baseUrl + "users/user",{params: {username: user.username}})
        .then(result=>setUserData(result))
    }
    getUserData()
    }
  ,[])

  if (!user){
    return null
  } 
  return (
    
    <div className="user-data">
      {userData.data.avatar ? <img className="avatar" src={`${baseUrl + userData.data.username}.png`}/> : 
      <img className="avatar" src={"/user.png"}/>}
      <div className="info">
        <p className="name">{userData.data.name} {userData.data.lastname}</p>
        <p className="username">{userData.data.username}</p>
      </div>

      </div>
  )
}

export default User