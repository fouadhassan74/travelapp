import React, { useRef, useState } from "react";
import "../login/login.css";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
function Login({ setShowLogin, setCurrentUser }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const email = useRef();
  const password = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: email.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post("/api/user/login", user);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className='registerContaner'>
      <form onSubmit={handleSubmit}>
        <input placeholder='username' ref={email} type='text' />
        <input placeholder='password' ref={password} type='password' />
        <button className='registerBtn' type='submit'>
          Submit{" "}
        </button>
        {error && <p className='failure'>Something went wrong</p>}
        {success && <p className='success'>Successd</p>}
      </form>
      <CancelIcon
        className='registerCancel'
        onClick={() => setShowLogin(false)}
      />
    </div>
  );
}

export default Login;
