'use client'
import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProviders = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repositories, setRepositories] = useState([]);
    const [repository, setRepository] = useState({});
    
    return (
        <AppContext.Provider value={{
            user,
            users,
            setUser,
            setUsers,
            repositories, 
            setRepositories,
            repository,
            setRepository
        }}>
            {
                children
            }
        </AppContext.Provider>
    )
}

export default AppProviders