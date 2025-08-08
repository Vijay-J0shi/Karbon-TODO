import React, { useContext, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';


function Login() {
  const [show, setShow] = useState(false);
  const { serverUrl, loading, setLoading } = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
const { loginWithRedirect } =useAuth0();
  

const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      toast.success("Login Successfully");
      navigate('/');
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin=async()=>{
    setLoading(true);
   localStorage.setItem("authOp","login")
    try{
      await loginWithRedirect()
      
    }catch{
      toast.error( "Google login failed")
    }finally{
      setLoading(false)
    }

  }

  

  return (
    <div className="w-screen h-screen flex items-center justify-center font-[var(--ff)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <form
        onSubmit={handleLogin}
        className="max-w-[900px] w-[90%] h-[600px] flex flex-col items-center md:items-start justify-center gap-4"
      >
        <h1 className="text-[var(--fs-xl)] font-bold">Welcome to Savinks</h1>

        <div className="w-[90%] flex flex-col gap-2">
          <label htmlFor="email" className="text-[var(--fs-lg)]">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[90%] h-10 border-2 border-[var(--color-secondary)] rounded-lg px-4 text-[var(--fs-base)] bg-transparent text-[var(--color-secondary)]"
          />
        </div>

        <div className="w-[90%] flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-[var(--fs-lg)]">Password</label>
          <input
            type={show ? "text" : "password"}
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[90%] h-10 border-2 border-[var(--color-secondary)] rounded-lg px-4 text-[var(--fs-base)] bg-transparent text-[var(--color-secondary)]"
          />
          {show ? (
            <IoMdEyeOff
              className="w-6 h-6 absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => setShow(false)}
            />
          ) : (
            <IoMdEye
              className="w-6 h-6 absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => setShow(true)}
            />
          )}
        </div>

        <button
          disabled={loading}
          className="bg-[var(--color-accent)] text-[var(--color-primary)] text-[var(--fs-base)] py-2 px-12 rounded-lg mt-4"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="text-[var(--fs-base)]">
          Create new account{" "}
          <span
            className="text-[var(--color-accent)] cursor-pointer font-semibold"
            onClick={() => navigate("/SignUP")}
          >
            SignUp
          </span>
        </p>
        <p className="text-[var(--fs-base)]">
          Login with{" "}
          <span
            className="text-[var(--color-accent)] cursor-pointer font-semibold"
            onClick={()=>handleGoogleLogin()}
          >
            google
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
