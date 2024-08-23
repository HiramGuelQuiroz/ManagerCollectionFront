import {useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()//creating context
const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => { //when you load the app it will load the use effect because of the Context
        const authenticateUser = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/ussers/perfil',config)

                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setLoading(false)

        }
        authenticateUser()
    }, [])

    const logOut = () => {
        localStorage.removeItem('token')//deleting token
        setAuth({})
    }

    return(
        <AuthContext.Provider
        value={{
            auth,
            setAuth,
            loading,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext