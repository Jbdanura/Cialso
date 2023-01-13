import axios from 'axios'
import React, { useState } from 'react'

const Publish = ({baseUrl,user, refreshPosts}) => {
  const [description, setDescription] = useState("")
  const [successMessage, setSuccessMessage] = useState(false)
  const publishPost = async(event)=>{
    event.preventDefault()
    const token = `bearer ${user.token}`
    const config = {headers: {Authorization: token}}
    axios.post(`${baseUrl}posts/new`,{description},config)
    .then(function (response) {
      if(response.status === 200){
        setSuccessMessage(true)
        setTimeout(()=>{
          setSuccessMessage(false)
        },3000)
        if(refreshPosts) refreshPosts()
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    setDescription("")
  }

  return (
    <>
    {user &&
      <form onSubmit={(event)=>publishPost(event)} className="post-form-container">
      {successMessage && <div className="post-success">Your post has been created!</div>}
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