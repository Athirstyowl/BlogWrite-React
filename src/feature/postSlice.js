import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '',
    content: '',
    slug :'',
    featuredImage: '',
    userId: '',
    fileId: '',
    file: '',
}

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers: {
        createPost: () => {},
        deletePost : () => {},
        updatePost : () => {},
        getPost : () => {},
        getPosts : () => {},
        uploadFile : () => {},
        deleteFile : () => {},
        getFilePreview : () => {}
    }
})

export const { createPost, deletePost, updatePost, getPost, getPosts, uploadFile, deleteFile, getFilePreview } = postSlice.actions;
export default postSlice.reducer;