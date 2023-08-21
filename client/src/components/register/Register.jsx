import React, { useRef, useState } from "react";
import "../register/register.css";
import earth from "../../img/earth.jpg";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
function Register({ setCurrentUser, setShowRegister }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newuser = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post("/api/user/register", newuser);
      console.log(res.data);
      // setCurrentUser(res.data)
      setSuccess(true);
      setShowRegister(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className='registerContaner'>
      <form onSubmit={handleSubmit}>
        <input placeholder='username' ref={username} type='text' />
        <input placeholder='email' ref={email} type='email' />
        <input placeholder='password' ref={password} type='password' />
        <button className='registerBtn' type='submit'>
          Submit{" "}
        </button>
        {error && <p className='failure'>Something went wrong</p>}
        {success && <p className='success'>Successd</p>}
      </form>
      <CancelIcon
        className='registerCancel'
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}

export default Register;
