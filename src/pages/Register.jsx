import { useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../config/axios"; //axios is a JavaScript library used to make HTTP requests from the browser (on the client side)
import Alert from "../components/Alert";


const Register = () => {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [repeatPassword, setRepeatPassword] = useState('')
const [alert, setAlert] = useState({})//empty object

//Paaswords check
const handleSubmit = async e => {
  e.preventDefault();
  
  if([name, email, password, repeatPassword].includes('')){ //checks if any of the values ​​in the array are an empty string ('').
    setAlert({ msg: 'empty fields exist', error: true})//object being passed to setAlert
    return;
  }

  if(password !== repeatPassword) {
    setAlert({ msg: 'the passwords are different', error: true})
    return;
  }

  setAlert({})

  //Creating the user on api
  try {
    await axiosClient.post( '/ussers', {name, email, password} )
    setAlert({
      msg: 'Succesful, check your email',
      error: false
    })
     //Reset form
     setName('');
     setEmail('');
     setPassword('');
     setRepeatPassword('');
     setPosition('');
   
  } catch (error) {
     setAlert({
        msg: error.response.data.msg, //error message from backend usserController
        error: true
     }) 
  }
}

  const {msg} = alert

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
          Create an account and manage your {""}
            <span className="text-black"> Collections</span>
          </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

          { msg && <Alert //If there is something in msg then show the component
              alert={alert} //Alert will receive a property called alert whose value comes from a variable or state also called alert in the parent component.
          ></Alert>}
          
          <form
              onSubmit={handleSubmit}
            >

          <div className="my-5">
              <label className="uppercase text-gray-700 block text-xl font-bold"
              >
                Name
              </label>
              <input type="text"
                     placeholder="Your name"
                     className="border w-full p3 mt-3 bg-gray-50 rounded-xl"
                     value={name}
                     onChange={ e => setName(e.target.value)}//used to capture and update the state of a React component with the value the user types into an input field
               />
          </div>

          <div className="my-5">
              <label className="uppercase text-gray-700 block text-xl font-bold"
              >
                Email
              </label>
              <input type="email"
                     placeholder="Registration email "
                     className="border w-full p3 mt-3 bg-gray-50 rounded-xl"
                     value={email}
                     onChange={ e => setEmail(e.target.value)}
               />
          </div>

            <div className="my-5">
              <label className="uppercase text-gray-700 block text-xl font-bold"
              >
                Password
              </label>
              <input type="password"
                     placeholder="Your Password "
                     className="border w-full p3 mt-3 bg-gray-50 rounded-xl"
                     value={password}
                     onChange={ e => setPassword(e.target.value)}
               />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-700 block text-xl font-bold"
              >
                Repeat Password
              </label>
              <input type="password"
                     placeholder="Repeat your Password "
                     className="border w-full p3 mt-3 bg-gray-50 rounded-xl"
                     value={repeatPassword}
                     onChange={ e => setRepeatPassword(e.target.value)}
               />
            </div>

            <input
              type="submit"
              value="Create Account"
              className="bg-indigo-700 w-full py-3 px-10
              rounded-xl text-white uppercase
              font-bold mt-5 hover:cursor-pointer
              hover:bg-indigo-800 md:w-auto"
            />

            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-gray-500"
                    to="/">Have an account?  Lon In</Link>
                <Link
                    className="block text-center my-5 text-gray-500"
                    to="/forget-password">I forgot my password</Link>
            </nav>

        </div>
    </>
  )
};

export default Register;
