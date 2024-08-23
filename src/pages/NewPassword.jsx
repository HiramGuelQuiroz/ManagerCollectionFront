import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

const NewPassword = () => {

  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [validToken, setValidToken] = useState(false)
  const [modifiedPassword, setModifiedPassword] = useState(false)


  const params = useParams()
  const { token } = params

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/ussers/forget-password/${token}`)
        setAlert({
          msg: 'Put your new password'
        })
        setValidToken(true)
      } catch (error) {
        setAlert({
          msg: 'there was an error with the link',
          error: true
        })
      }

    }
    checkToken()
  }, [])

  const handleSubmit = async (e) => {
      e.preventDefault()

      if(password.length <1) {
        setAlert({
          msg: 'Missing password',
          error:true
        })
        return
      }
  

  try {
     const url = `/ussers/forget-password/${token}`
     const { data } = await axiosClient.post(url, {password})
     setAlert({
      msg: data.msg
     })
     setModifiedPassword(true)
  } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
  }

}

  const { msg } = alert

  return (
    <>
      <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Reset your password and dont lose access to {""} 
                    <span className="text-black">you collections</span>
                </h1>
       </div>

       <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>


       { msg && <Alert
              alert={alert}
          ></Alert>}

        { validToken && (
            <>
             <form onSubmit={handleSubmit}>
             <div className="my-5">
                   <label className="uppercase text-gray-700 block text-xl font-bold"
                   >
                     New Password
                   </label>
                   <input type="password"
                          placeholder="Your New Password "
                          className="border w-full p3 mt-3 bg-gray-50 rounded-xl"
                          value={password}
                          onChange={ e => setPassword(e.target.value)}
                    />
                  </div>
     
                 <input
                   type="submit"
                   value="Save new password"
                   className="bg-indigo-700 w-full py-3 px-10
                   rounded-xl text-white uppercase
                   font-bold mt-5 hover:cursor-pointer
                   hover:bg-indigo-800 md:w-auto"
                 />
     
             </form>

             
              </>
        )}

        {modifiedPassword &&  
             <Link
              className="block text-center my-5 text-gray-500"
              to="/">Lon In</Link>}

       
       </div>
    </>
  )
};

 export default NewPassword;