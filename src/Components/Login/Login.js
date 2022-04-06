import React, {useState,useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import { Link, useHistory } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg,setErrorMsg] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()
  const handleLogin = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
      history.push('/')
    }).catch((err) => {
      setErrorMsg(err.message)
    })
  }

  return (
    <div >
      <div className="loginParentDiv">
        <div className="d-flex justify-content-center">
        <img width="200px" height="200px" src={Logo}></img>

        </div>
        <form onSubmit={handleLogin}>
          <br/>
          <input
            className="input login_input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder='Email'
          />
          <br />
          <br />
          <input
            className="input login_input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder='Password'
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'><span className='btn'>Signup</span></Link>
      { errorMsg && <p style={{color:'red'}} className='text-center' >{errorMsg}</p>}
      </div>
    </div>
  );
}

export default Login;
