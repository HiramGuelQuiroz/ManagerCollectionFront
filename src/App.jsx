import {BrowserRouter, Routes, Route} from 'react-router-dom'//allows a React application to use declarative routing
import AuthLayout  from './layout/AuthLayout'
import ProtectedRoute from './layout/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import NewPassword from './pages/NewPassword'
import ManageCollections from './pages/ManageCollections'

import { AuthProvider } from './context/AuthProvider'
import { CollectionsProvider } from './context/CollectionsProvider'
import EditProfile from './pages/EditProfile'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CollectionsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}> 
                <Route index element={<Login/>} />
                <Route path="register" element={<Register/>} />
                <Route path="forget-password" element={<ForgetPassword/>} />
                <Route path="forget-password/:token" element={<NewPassword/>} />
                <Route path="confirm/:id" element={<ConfirmAccount/>} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute/>}>
              <Route index element={<ManageCollections/>}></Route>
              <Route path="perfil" element={<EditProfile />} />
            </Route>
          </Routes>
        </CollectionsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
