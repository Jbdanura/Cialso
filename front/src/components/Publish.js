import axios from 'axios'
import React, { useState } from 'react'

const Publish = ({baseUrl,user}) => {
  const [description, setDescription] = useState("")
  const publishPost = async(event)=>{
    event.preventDefault()
    const token = `bearer ${user.token}`
    const config = {headers: {Authorization: token}}
    axios.post(`${baseUrl}posts/new`,{description},config)
    setDescription("")
  }
  return (
    <>
    {user &&
      <form onSubmit={(event)=>publishPost(event)} className="post-form-container">
      <textarea className="post-description" value={description} placeholder="What do you want to post?" 
      onChange={(event)=>setDescription((event.target.value))}></textarea>
      <div className="post-form-submit">
        <input type="submit" value="Post"></input>
      </div>     
    </form>
    }
    </>
  )
}

export default Publish