import axios from 'axios'
import React, { useState } from 'react'

const Publish = ({baseUrl,user}) => {
  const [description, setDescription] = useState("Description of your post")
  const publishPost = async(event)=>{
    event.preventDefault()
    axios.post(`${baseUrl}posts/new`,{description})
    .then(result=>console.log(result))
  }
  return (
    <div>
        <form onSubmit={(event)=>publishPost(event)} className="post-form-container">
            <textarea className="post-description" value={description} onChange={(event)=>setDescription((event.target.value))}></textarea>
            <br></br>
            <input type="submit" value="Post"></input>
        </form>
    </div>
  )
}

export default Publish