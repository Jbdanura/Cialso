import React from 'react'
import { useState } from 'react'
import background from '../background.jpg';
import axios from "axios"

const Login = ({baseUrl,setUser}) => {

  const [loginForm,setLoginForm] = useState(false)
  const [errorMessage,setErrorMessage] = useState()
  const [message,setMessage] = useState()
  const changeFormStyle = {
      textDecoration:"underline",
      color:"lightgreen",
      cursor:"pointer"
  }
  const createAccount = async(event) => {
    event.preventDefault()
    const name = event.target.name.value
    const lastname = event.target.lastname.value
    const username = event.target.username.value
    if (name.split(" ").length !== 1 || lastname.split(" ").length !== 1 || username.split(" ").length !== 1) {
      setErrorMessage("Only one word per field!")
      setTimeout(()=>{
        setErrorMessage()
      },5000)
      return
    }

    const email = event.target.email.value
    const password = event.target.password.value
    
    axios.post(baseUrl+"users/account/new",{name,lastname,username,email,password})
    .then((result)=>{
      setMessage(result.data)
      setTimeout(()=>{
        setMessage()
      },5000)
      event.target.name.value = ""
      event.target.lastname.value = ""
      event.target.username.value = ""
      event.target.email.value = ""
      event.target.password.value = ""
    })

    .catch((error)=>{
      if(error.response){
        setErrorMessage(error.response.data)
        setTimeout(()=>{
          setErrorMessage()
        },5000)}
      })
  }
  const login = async(event)=>{
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    axios.post(baseUrl+"users/account/login",{username,password})
    .then((result)=>{
      setUser(result.data)
      localStorage.setItem("user",JSON.stringify(result.data))
    })
    .catch((error)=>{
      if(error.response){
        setErrorMessage(error.response.data)
        setTimeout(()=>{
          setErrorMessage()
        },5000)}
      })
    }

  return (
    <div className="intro-container" style={{backgroundImage:`url(${background})`}}>
        <p className="intro-logo">Cialso</p>
        <form className="intro-form" style={loginForm ? {display:"none"} : {display:"flex"}} onSubmit={createAccount}>
          <p>REGISTER NOW</p>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          {message && <p className="msg">{message}</p>}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-badge" viewBox="0 0 16 16">
            <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
          </svg>
          <input name="name" minLength="3" maxLength="15" type="text" placeholder="Name"></input>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-badge-fill" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"/>
          </svg>
          <input name="lastname" minLength="3" maxLength="15" type="text" placeholder="Last name"></input>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
          <input name="username" minLength="3" maxLength="15" type="text" placeholder="Username"></input>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
          </svg>
          <input name="email" type="email" maxLength="35" placeholder="Email"></input>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
            <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
          <input name="password" minLength="5" maxLength="25" type="password" placeholder="Password"></input>
          <p className="change-form">ALREADY HAVE AN ACCOUNT? <span style={changeFormStyle} onClick={()=>setLoginForm(true)}>LOGIN</span></p>
          <button type="submit">REGISTER</button>
        </form>
        <form className="intro-form" style={loginForm ? {display:"flex"} : {display:"none"}} onSubmit={login}>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          <p>LOGIN</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
          <input name="username" type="text" placeholder="Username"></input>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
            <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
          <input name="password" type="password" placeholder="Password"></input>
          <p className="change-form">DONT HAVE AN ACCOUNT? <span className="change-form-click "style={changeFormStyle} onClick={()=>setLoginForm(false)}>REGISTER</span></p>
          <button type="submit">LOGIN</button>
        </form>
      </div>
  )
}

export default Login