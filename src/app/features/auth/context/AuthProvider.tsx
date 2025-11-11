import {createContext, ReactNode, use, useCallback, useContext, useState} from "react";
import {AuthContexType} from "@features/auth/types/authContexType";
import {mockUser} from "@features/auth/mockUser";
import {LoginCredentials, RegisterCredentials} from "@features/auth/types/credentials";
import {createSuccessResponse} from "@/app/shared/lib/response";

const AuthContext = createContext<AuthContexType>({
    user: null,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
    authError: null,
    isLoading: false,
    isLoggedIn: false,
    isLoaded: false,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const resetLoading = useCallback(() => {
        setLoading(false);
        setIsLoaded(true);
    }, [])

    const setLoadings = useCallback(() =>{
        setLoading(true);
        setIsLoaded(false);
    }, [])

    //TODO: getUser useEffect

    //TODO: change this one out with cloudflare connection
    async function loginAndGetUser(email: string, password: string):Promise<Response> {
        console.log("Trying to log in");
        setTimeout(()=> {},1000)
        console.log("Logg inn complete");
        return new Promise(resolve=>{resolve(createSuccessResponse<User>(mockUser))})
    }

    const loginUser = async (loginCredentials:LoginCredentials):Promise<void> => {
        const {email, password} = loginCredentials;
        setAuthError(null);
        setLoadings()
        //TODO: make authentication up towards cloudflare instead of mock
        const response:Response = await loginAndGetUser(email, password);
        const result:User|null = await response.json();
        setUser(result);
        if (!response.ok)
        {
            setAuthError("Something went wrong");
        }
        resetLoading()
    }

    const logoutUser = async () => {
        setLoadings()
        //TODO:add logout function
        setUser(null);
        resetLoading()
    }

    const registerUser = async (registerCredentials:RegisterCredentials):Promise<void> => {
        const {email, password} = registerCredentials;
        setLoadings()
        //TODO: change to register function
        const response = await loginAndGetUser(email, password);
        resetLoading()
    }

    return (
        <AuthContext.Provider value={{
            user,
            login: loginUser,
            logout: logoutUser,
            register: registerUser,
            authError: authError,
            isLoading: loading,
            isLoaded,
            isLoggedIn: (user !== null),
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = use(AuthContext)
    if (!context){
        throw new Error("useAuth must be used within a auth");
    }
    return context;
}