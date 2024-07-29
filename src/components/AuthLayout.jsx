import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication=true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector( state => state.auth.status)

    useEffect(() => {
        // if(authStatus == true){
        //     navigate("/")
        // } else if(authStatus == false){
        //     navigate("/login")
        // }

      if(authentication && authStatus !== authentication){ //true && false !== true ----> true, so we will ask the user to login
        navigate("/login")
      }
      else if(!authentication && authStatus !== authentication){ // false && true !== true ----> true, so the user is authenticated
        navigate('/')
      }
      setLoader(false)
    }, [authStatus, authentication])
    
  return (
    loader ? <h1>Loading....</h1> : <>{children}</>
  )
}

export default Protected
// Authentication Layout is used to protective mechanism for routes or pages
// Protect Container