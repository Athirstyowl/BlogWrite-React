import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className='block h-full'>
      <div className='w-full bg-gray-100 rounded-xl p-4 flex flex-col h-full'>
        <div className='aspect-w-16 aspect-h-9 mb-4 flex-shrink-0'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className='rounded-xl object-cover w-full h-full'
          />
        </div>
        <h2 className='text-xl font-bold text-black flex-grow'>
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard
