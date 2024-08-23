import { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom' //useParams Allows access to URL parameters in a functional React component.
import Alert from '../components/Alert';
import axiosClient from '../config/axios';

const ConfirmAccount = () => {
  const [confirmAccount, setConfirmAccount] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({})

  const params = useParams()
  const {id} = params //we ectract the token from url


  //useEffect allows you to handle side effects on functional React components, 
  //such as fetching data, manipulating the DOM, and setting timers.
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/ussers/confirm/${id}`
        const {data} = await axiosClient(url)//makes an HTTP request to a specified URL, waits for the response, and then extracts and assigns the data from that response to the data variable
        setConfirmAccount(true)
        setAlert({
          msg: data.msg
        })
        
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,//extract and handle the specific error message that the server has sent in response to a failed request.
          error: true
        })
      }
      setLoading(false)
    }
    confirmAccount();
}, [])// [] only is executed 1 time

  return (
    <>
      <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Confirm your account and  {""} 
                <span className="text-black">Manage your collections</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {!loading &&  
                  <Alert 
                    alert={alert}
                  />}
        
        {confirmAccount && (//if true show link
                    <Link
                      className='block text-center my-5 text-gray-500'
                      to="/">Log In</Link>
                  ) }  
        </div>  
    </>
  )
  };
  
  export default ConfirmAccount;