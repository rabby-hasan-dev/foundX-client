import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { ICureentUser } from "../types";
import { getCurrentUser } from "../services/AuthService";


interface IUserProviderValues {
    user: ICureentUser | null;
    isLoading: boolean;
    setUser: (user: ICureentUser | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>

}


export const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<ICureentUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUser = async () => {
        const user = await getCurrentUser();
        setUser(user);
        setIsLoading(false);
    }

    useEffect(() => {
        handleUser()

    }, [isLoading])

    return (

        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }} >
            {children}
        </UserContext.Provider>
    )

}


export const useUser=()=>{
    const context=useContext(UserContext);


    if(context===undefined){
        throw new Error ('User must be use within the useProvider context')
    }
    return context;
}

export default UserProvider;