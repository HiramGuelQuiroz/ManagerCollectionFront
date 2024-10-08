import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";
import axiosClient from "../config/axios";

const Login = () => {

  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('')
  const [alert, setAlert] =useState({})
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email, password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true
      });

      return
    }

    try {
        const { data } = await axiosClient.post('/ussers/login', {email, password})
        localStorage.setItem('token', data.token)
        setAuth(data)
        navigate('/admin')
    } catch (error) {
       setAlert({
        msg: error.response.data.msg,
        error: true
       })
    }
  }

  const{ msg } = alert
 
  return (
    <>
        <div>
          <h1 className="text-indigo-500 font-black text-6xl">
              Log in and Manage your {""}
              <span className="text-black"> Collections</span>
          </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alert 
                    alert={alert}
                  />}  

          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label 
                  className="uppercase text-gray-700 block text-xl font-bold"
              >
                Email
              </label>
              <input type="email"
                     placeholder="Registration email"
                     className="border w-full p3 mt-3 bg-gray-50 rounded-xl"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
               />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-700 block text-xl font-bold"
              >
                Password
              </label>
              <input type="password"
                     placeholder="Your password"
                     className="border w-full p3 mt-3 bg-gray-50 rounded-xl"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
               />
            </div>

            <input
              type="submit"
              value="Log In"
              className="bg-indigo-700 w-full py-3 px-10
              rounded-xl text-white uppercase
              font-bold mt-5 hover:cursor-pointer
              hover:bg-indigo-800 md:w-auto"
            />

          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link
                className="block text-center my-5 text-gray-500"
                to="/register">You do not have an account? Register</Link>

             <Link
                className="block text-center my-5 text-gray-500"
                to="/forget-password">I forgot my password</Link>
          </nav>
        </div>
    </>
  );
};

export default Login;