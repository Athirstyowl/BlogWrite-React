import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";
import authService from "./auth";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)
        
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch(error){
            console.log("Appwrite service::creatPost error", error)
            return false
        }
    }

    async updatePost( slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch(error){
            console.log("Appwrite service::updatePost error", error)
            return false
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch(error){
            console.log("Appwrite service::deletePost error", error)
            return false
        }
    }

    async getPost(slug){
        try{
            return this.databases.getDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug
                )
        }catch(error){
            console.log("Appwrite service:: getPost error", )
            return false
        }
    }

    async getPosts(queries = [ Query.equal("status","active")]){
        try{
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
                //pagination
            )
        }
        catch(error){
            console.log("Appwrite service:: getPosts error", error)
            return false
        }
    }

    // file service
    async uploadFile(file) {
        try {
            // Log the current user's session or authentication status
            const currentUser = await authService.getCurrentUser();
            console.log("Current User:", currentUser);
    
            if (!currentUser) {
                throw new Error("User is not authenticated");
            }
    
            // Log the bucket ID and file details
            console.log("Bucket ID:", conf.appwriteBucketId);
            console.log("File Details:", file);
    
            // Attempt to upload the file
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        }
        catch (error) {
            console.error("Appwrite services:: uploadFile error", error);
    
            // Provide more context about the error
            if (error.response) {
                console.error("Error Response:", error.response);
            } else if (error.request) {
                console.error("Error Request:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
    
            return false;
        }
    }
    

    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile( conf.appwriteBucketId, fileId )
        }
        catch(error){
            console.log("Appwrite services:: deleteFile error", error)
            return false
        }
    }

    getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
        }
        catch(error){
            console.log("Appwrite service:: getFilePreview error", error)
        }
    }
}

const appwriteService = new Service()
export default appwriteService