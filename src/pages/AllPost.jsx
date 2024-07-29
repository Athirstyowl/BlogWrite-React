import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard, PostForm } from '../components'

function AllPost() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => { posts ? setPosts(posts.documents) : null })
            .catch((error) => console.log(error))

    }, [])


    return (
        <div className='py-8'>
            <Container>
                <div className='flex flex-wrap '>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
                            </div>
                        )

                        )
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPost