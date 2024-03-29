import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Post from './Post'
import Publish from './Publish'

const User = ({baseUrl, user}) => {
  const username = useParams().username
  const [userData,setUserData] = useState(null)
  const [followingState,setFollowingState] = useState(false)
  const [following,setFollowing] = useState(null)
  const [followers,setFollowers] = useState(null)
  const [followersModal, setFollowersModal] = useState(false)
  const [followingModal,setFollowingModal] = useState(null)
  const [noUser, setNoUser] = useState(false)
  const [page,setPage] = useState(1)
  const [isLoading,setIsLoading] = useState(false)
  const [maxPosts, setMaxPosts] = useState(false)
  const [toggleLoading, setToggleLoading] = useState(false)
  const navigate = useNavigate()
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const toggleFollowersModal = () => {
      setFollowersModal(!followersModal);
  };
  const toggleFollowingModal = () => {
    setFollowingModal(!followingModal);
  };
  const toggleNoUser = () => {
    setNoUser(!noUser)
  }
  const refreshPosts = () => {
    axios.post(baseUrl+ `users/user/${username}`,{page})
    .then(result => setUserData(result.data))
  }
  const handleScroll = async () => {
    if (!maxPosts && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setIsLoading(true)
        await wait(1000)
        setPage(page =>page + 1);
        setIsLoading(false)
    }
  }
  useEffect(()=>{
    const getUserData = async() => {
        if(!user) return
        axios.post(baseUrl+ `users/user/${username}`,{page})
        .then(result=>{
          if(!result.data){
            toggleNoUser()
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

      if(userData){
        if(userData.Posts.length < 10 * page) setMaxPosts(true)
      }
      window.addEventListener('scroll', handleScroll);
      return ()=>window.removeEventListener("scroll",handleScroll)
    }
  ,[username, user,page,followingState,toggleLoading])

  const followUser = async(userToFollow,username) => {
    const token = `bearer ${user.token}`
    const config = {headers: {Authorization: token}}
    axios.post(`${baseUrl}users/follow`,{userToFollow,username},config)
    .then(result=>{
      setFollowingState(result.data)
    })
  }

  const changeUserDataLikes = () => {
    setToggleLoading(!toggleLoading)
  }

  if (!user){
    navigate("/")
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
        {userData.username === user.username &&
          <Publish baseUrl={baseUrl} user={user} refreshPosts={refreshPosts}/>
        }
        {userData.Posts.length > 0 ? 
          <div className="user-posts">
            {userData.Posts.map(post=>{
              const isLiked = post.likedBy.filter(postInfo => postInfo.Like.userId === user.id)
              let showLike = false
              if(isLiked.length > 0){
                showLike = true
              } 
              
              return <Post key={post.id} post={post} userData={userData} baseUrl={baseUrl} user={user} inHome={false} showLike={showLike}
              changeUserDataLikes={changeUserDataLikes} ></Post>
            })}
          </div> : null}
        {isLoading && <p className="loading-posts">Loading...</p>}
        {followersModal &&  
          <div className="modal-overlay">
            <div className="followers-modal">
              <div className="modal-top">
                <h1>Followers</h1>
                <button className="close-modal" onClick={toggleFollowersModal}>X</button>
              </div>
              {followers && followers.map(follower =>{
                return <div onClick={()=>{
                  toggleFollowersModal()
                  navigate(`/${follower.follower.username}`)
                  }} className="user-follow" key={follower.follower.id}>
                    {follower.follower.avatar ? <img className="avatar-follow" src={`${baseUrl + follower.follower.username}.png`}/> : 
                    <img className="avatar-follow" src={"/user.png"}/>}
                    <p>{follower.follower.username} - {follower.follower.name + " " + follower.follower.lastname} </p>
                  </div>
              })}
            </div>
          </div>
        }
        {followingModal &&
          <div className="modal-overlay">
          <div className="following-modal">
            <div className="modal-top">
              <h1>Following</h1>
              <button className="close-modal" onClick={toggleFollowingModal}>X</button>
            </div>
              {following && following.map(following =>{
                return <div onClick={()=>{
                  toggleFollowingModal()
                  navigate(`/${following.following.username}`)
                  }} className="user-follow" key={following.following.id}>
                    {following.following.avatar ? <img className="avatar-follow" src={`${baseUrl + following.following.username}.png`}/> : 
                    <img className="avatar-follow" src={"/user.png"}/>}
                    <p>{following.following.username} - {following.following.name + " " + following.following.lastname} </p>
                  </div>
              })}
            </div>
          </div>
        }
        </div> :
        <div className="not-found">{noUser && "404 User not found"}</div>}
    </>

  )
}

export default User