import React, { useState, useContext } from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [errorMsg,setErrorMsg] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(errorMsg == ''){
      firebase.auth().createUserWithEmailAndPassword(email,password).then((result) => {
        result.user.updateProfile({displayName:username}).then(() => {
          firebase.firestore().collection('user').add({
            id:result.user.uid,
            username:username,
            phone:phone
          }).then(() => {
            history.push('/login')
          })
        }).catch((err) =>{
          setErrorMsg(err.message)
        })
      }).catch((err) =>{
        setErrorMsg(err.message)
      })
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <div className='d-flex justify-content-center'>
        <img className='signip_logo' width="200px" height="200px" src={Logo}></img>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="input signup_input"
            type="text"
            value={username}
            onChange={(event) => {setUsername(event.target.value)
              if(event.target.value.length < 3){
                setErrorMsg('Username should be at least 3 characters')
              }else{
                setErrorMsg('')
              }
            }}
            id="fname"
            placeholder='Username'
            name="name"
          />
          <br/>
          <br/>
          <input
            className="input signup_input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="fname"
            placeholder='Email'
            name="email"
          />
          <br />
          <br />
          <input
            className="input signup_input"
            type="number"
            id="lname"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value)
              if(event.target.value.length < 10 || event.target.value.length > 10){
                const msg = 'Number must be 10 digits'
                setErrorMsg(msg)
                return false
              }else{
                setErrorMsg('')
              }
            }}
            name="phone"
            placeholder='Phone'
          />
          <br />
          <br />
          <input
            className="input signup_input"
            type="password"
            id="lname"
            value={password}
            onChange={(event) => {setPassword(event.target.value)
             if(event.target.value.length < 6){
               setErrorMsg('Password should be at least 6 characters')
             }else{
               setErrorMsg('')
             }
            }}
            name="password"
            placeholder='Password'
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'><span className='btn'>Login</span></Link>
        { errorMsg && <p style={{color:'red'}} className='text-center' >{errorMsg}</p>}
      </div>
    </div>
  );
}
