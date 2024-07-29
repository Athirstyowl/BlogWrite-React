import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                return await this.login({ email, password });
            } else {
                return null;
            }
        } catch (error) {
            console.log("Appwrite service:: createAccount error", error);
            return false;
        }
    }

    async login({ email, password }) {
        try {
            const login = await this.account.createEmailPasswordSession(email, password);
            if (login) {
                console.log("Login successful", login);
                return login;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Appwrite service:: login error", error);
            return false;
        }
    }

    async getCurrentUser() {
        try {
            // Attempt to get the current session
            const session = await this.account.getSession('current');
            if (session) {
                // If a session exists, retrieve the user data
                const user = await this.account.get();
                return user;
            } else {
                console.log("No active session found.");
                return null;
            }
        } catch (error) {
            if (error.code === 401) {
                // Handle no active session (401 Unauthorized)
                console.log("No active session found.");
                return null;
            } else {
                console.log("Appwrite service:: getCurrentUser error", error);
                return null;
            }
        }
    }
    async logout() {
        try {
            await this.account.deleteSessions(); // deleteSessions('current')
        } catch (error) {
            console.log("Appwrite service::Logout error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
