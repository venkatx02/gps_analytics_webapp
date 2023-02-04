import React, { useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { store } from './App';

const Login = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({email:'', password:''});

  const changeHandler = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/login',{email: data.email,password: data.password}).then(res => {
      setToken(res.data.token)
      localStorage.setItem("jwt", res.data.token)
    })
  };

  if(token){
    return <Navigate to="/summary" />
  };

  return (
    <div className='centered'>
      <center>
        <form onSubmit={submitHandler}>
            <input type='email' name= 'email' placeholder='Email' onChange={changeHandler} /><br />
            <input type='password' name= 'password' placeholder='Password' onChange={changeHandler} /><br />
            <input type='submit' value='Login' />
        </form>
        <Link to='register'>New User?</Link>
      </center>
    </div>
  )
}

export default Login