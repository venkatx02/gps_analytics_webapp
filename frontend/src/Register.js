import React, {useState} from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({username:'', email:'', password:'', cpassword:''});

  const changeHandler = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(data.password==data.cpassword){
      axios.post('http://localhost:5000/api/users/',{username: data.username, email: data.email, password: data.password}).then(res => {
        if(res.data.message){
          alert(res.data.message)
        }
      });
    }else{
      alert("Passwords doesn't match");
    }
  };

  return (
    <div className='centered'>
      <center>
        <form onSubmit={submitHandler}>
          <input type='text' name= 'username' placeholder='Username'  onChange={changeHandler} /><br />
          <input type='email' name= 'email' placeholder='Email' onChange={changeHandler} /><br />
          <input type='password' name= 'password' placeholder='Password' onChange={changeHandler} /><br />
          <input type='password' name= 'cpassword' placeholder='Confirm Password' onChange={changeHandler} /><br />
          <input type='submit' value='Register' />
        </form>
        <Link to='..'>Already have an account?</Link>
      </center>
    </div>
  )
}

export default Register