import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

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


  if (!user){
    return null
  } 

  return (
    <>
    {userData && userData.username == username ? 
      <div className="user-container">
        <div className="user-data">
          {userData.avatar ? <img className="avatar" src={`${baseUrl + userData.username}.png`}/> : 
          <img className="avatar" src={"/user.png"}/>}
          <div className="info">
            <p className="name">{userData.name} {userData.lastname}</p>
            <p className="username">@{userData.username}</p>
          </div>
        </div> 
        {userData.Posts.length > 0 ? 
          <div className="user-posts">
            {userData.Posts.map(post=>{
              /*{id: 10, description: 'hola', createdAt: '2022-11-20T21:40:38.997Z',
              updatedAt: '2022-11-20T21:40:38.997Z', UserId: 6}UserId: 6createdAt: "2022-11-20T21:40:38.997Z"description:
               "hola"id: 10updatedAt: "2022-11-20T21:40:38.997Z"[[Prototype]]: Object*/
              return <div className="user-post" key={post.id}>
                <div className="post-info">
                  {userData.avatar ? <img className="avatar" src={`${baseUrl + userData.username}.png`}/> : 
                  <img className="post-avatar" src={"/user.png"}/>}
                  <p className="post-name">{userData.name} {userData.lastname} 
                  <span className="post-username">@{userData.username}</span></p>
                </div>
                <p className="post-text">{post.description}</p>
              </div>
            })}
          </div> : null}
        </div>: null}
    </>

  )
}

export default User