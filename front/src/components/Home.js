import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Publish from './Publish'
import axios from 'axios'
import Post from './Post'

const Home = ({baseUrl,user}) => {
  const navigate = useNavigate()
  const [posts,setPosts] = useState([])

  useEffect(()=>{
    const getPosts = async()=>{
      if(!user) return
      await axios.get(`${baseUrl}posts/followingPosts/${user.username}`)
      .then(result=>setPosts(result.data)) 
    }
    getPosts()
  },[user])

  if(!user){
    return null
  }
  return (
    <div className="home">
        <p className="discover" onClick={()=>navigate("/discover")}>Discover new people</p>
        <Publish baseUrl={baseUrl} user={user}/>
        {posts &&
        <div className="home-posts-container">
          {posts.map(post=>{
            return <Post className="home-post" key={post.id} post={post} userData={post.User} baseUrl={baseUrl} user={user} inHome={true}></Post>
          })}
        </div>}
    </div>
  )
}

export default Home