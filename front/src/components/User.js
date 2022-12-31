import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Post from './Post'

const User = ({baseUrl}) => {
  const username = useParams().username
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [userData,setUserData] = useState(null)
  const [followingState,setFollowingState] = useState(false)
  const [following,setFollowing] = useState(null)
  const [followers,setFollowers] = useState(null)
  const [followersModal, setFollowersModal] = useState(false)
  const [followingModal,setFollowingModal] = useState(null)

  const toggleFollowersModal = () => {
      setFollowersModal(!followersModal);
  };
  const toggleFollowingModal = () => {
    setFollowingModal(!followingModal);
  };
  useEffect(()=>{
    const getUserData = async() => {
        axios.get(baseUrl+ `users/${username}`)
        .then(result=>{
          if(!result.data){
            return
          }
            setUserData(result.data)
            if(result.data.username != user.username){
              axios.post(baseUrl+ `users/followingState`,
              {follower: user.username,following: result.data.username})
              .then(result=>setFollowingState(result.data))
              axios.get(baseUrl+`users/whoFollow/${result.data.username}`)
              .then(result=>{
                setFollowing(result.data.following)
                setFollowers(result.data.followers)
              })
            } else {
              axios.get(baseUrl+`users/whoFollow/${user.username}`)
              .then(result=>{
                setFollowing(result.data.following)
                setFollowers(result.data.followers)
              })
            }
          })
      }
      getUserData()
      
    }
  ,[username])

  const followUser = async(userToFollow,user) => {
    axios.post(baseUrl + `users/follow`,{userToFollow,user})
    .then(result=>setFollowingState(result.data))
  }

  if (!user){
    return null
  } 

  return (
    <>
    {(userData && user ) ? 
      <div className="user-container">
        <div className="user-data">
          {userData.avatar ? <img className="avatar" src={`${baseUrl + userData.username}.png`}/> : 
          <img className="avatar" src={"/user.png"}/>}
          <div className="info">
            <p className="name">{userData.name} {userData.lastname}</p>
            <p className="username">@{userData.username}</p>
            <div className="follow-container">
              <p className="followers" onClick={toggleFollowersModal}><span style={{fontWeight:"bolder"}}>{followers ? followers.length : "..."}</span> followers</p>
              <p className="following" onClick={toggleFollowingModal}><span style={{fontWeight:"bolder"}}>{following ? following.length : "..."}</span> following</p>
              {userData.username != user.username &&
              <>
                {!followingState ? <p className="follow" onClick={()=>followUser(userData.username,user.username)}>Follow</p> :
                <p className="follow unfollow" onClick={()=>followUser(userData.username,user.username)}>Unfollow</p>}
              </>
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
        
        {followersModal &&  
          <div className="modal-overlay">
            <div className="followers-modal">
              <div className="modal-top">
                <h1>Followers</h1>
                <button onClick={toggleFollowersModal}>Close Modal</button>
                {console.log(followers)}
                {followers && followers.map(follower=>{
                  console.log(follower)
                  return <div key={follower}></div>
                })} 
              </div>
            </div>
          </div>
        }
        {followingModal &&
          <div className="modal-overlay">
          <div className="following-modal">
            <div className="modal-top">
              <h1>Following</h1>
              <button onClick={toggleFollowingModal}>Close Modal</button>
              </div>
            </div>
          </div>
        }


        </div> : <div className="not-found">404 User not found</div>}
    </>

  )
}

export default User