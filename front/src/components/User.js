import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Post from './Post'

const User = ({baseUrl,user}) => {
  const username = useParams().username
  const [userData,setUserData] = useState(null)

  useEffect(()=>{
    const getUserData = async() => {
      axios.get(baseUrl+ `users/${username}`)
      .then(result=>setUserData(result.data))
    }
    getUserData()
    }
  ,[username])

  const followUser = async(userToFollow,user) => {
    axios.post(baseUrl + `users/follow`,{userToFollow,user})
  }

  if (!user){
    return null
  } 

  return (
    <>
    {userData && 
      <div className="user-container">
        <div className="user-data">
          {userData.avatar ? <img className="avatar" src={`${baseUrl + userData.username}.png`}/> : 
          <img className="avatar" src={"/user.png"}/>}
          <div className="info">
            <p className="name">{userData.name} {userData.lastname}</p>
            <p className="username">@{userData.username}</p>
            <div className="follow-container">
              <p className="followers"><span style={{fontWeight:"bolder"}}>10</span> followers</p>
              <p className="following"><span style={{fontWeight:"bolder"}}>13</span> following</p>
              {userData.username != user.username &&
                <p className="follow" onClick={()=>followUser(userData.username,user.username)}>Follow</p>
              }
          </div>
          </div>

        </div> 
        {userData.Posts.length > 0 ? 
          <div className="user-posts">
            {userData.Posts.slice(0).reverse().map(post=>{
              return <Post key={post.id} post={post} userData={userData} baseUrl={baseUrl} user={user}></Post>
            })}
          </div> : null}
        </div>}
    </>

  )
}

export default User