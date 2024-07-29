import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../feature/authSlice'


function LogoutButton() {
  const dispatch = useDispatch()
  
  const logoutHandler = () => {
    authService.logout()
    .then(() => {
      dispatch(logout())
    })
  }
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 bg-red-500  hover:bg-red-100 rounded-full'>
      Logout
    </button>
  )
}

export default LogoutButton