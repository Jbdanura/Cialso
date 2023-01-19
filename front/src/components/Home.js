import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Publish from './Publish'
import axios from 'axios'
import Post from './Post'

const Home = ({baseUrl,user}) => {
  const navigate = useNavigate()
  const [posts,setPosts] = useState([])
  const [page,setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [maxPosts, setMaxPosts] = useState(false)
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getPosts = async()=>{
    if(!user) return
    await axios.post(`${baseUrl}posts/followingPosts/${user.username}`,{page:page})
    .then(result=>setPosts(result.data)) 
  }
  const handleScroll = async () => {
    if (!maxPosts && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setIsLoading(true)
        await wait(1000)
        setPage(page => page + 1);
        if(posts.length < 10 * page) setMaxPosts(true)
        setIsLoading(false)
    }
  }
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    getPosts()
    return ()=>{
      window.removeEventListener('scroll', handleScroll);
    }
  },[user,page])

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
        {isLoading && <p className="loading-posts">Loading...</p>}
    </div>
  )
}

export default Home