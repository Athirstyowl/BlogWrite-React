import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../feature/authSlice.js'
import { Button, Logo, Input } from './index.js'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth.js'
import { useForm } from 'react-hook-form'


function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const signup = async(data) => {
        setError('')
        try{
            const session = await authService.createAccount(data)
            console.log('session signup', session)
            if(session){
                const userData = await authService.getCurrentUser()
                console.log("userdta", userData)
                userData ? (dispatch(authLogin(userData)), navigate("/login")) : null
                
            }
        }
        catch(error){
          console.log("signup error", error)
            setError(error)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
          Create your Account to Sign in
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Already have an Account? &nbsp;
          <Link
            to='/login'
            className='font-medium text-primary transition-all duration-200 hover:underline'>
            Sign In
          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

        <form onSubmit={handleSubmit(signup)} className='mt-5'>
            <div className='space-y-5'>
            <Input
            label="Username: "
            placeholder="Enter your Username"
            type="name"
            {...register("name", {
                required:true,
                minLength:3
            })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter you password"
              type="password"
              {...register("password", {
                required:true,
                minLength: 6,
                maxLength: 32
              })
              }
            />
            <Button
            type='submit'
            bgColor='white'
            textColor='black'
            className='w-full border-2 border-slate-800 hover:bg-slate-300 duration-200'>
              Create Account
            </Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp