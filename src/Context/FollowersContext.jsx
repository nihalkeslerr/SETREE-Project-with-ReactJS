import { createContext } from "react";

const FollowersContext = createContext();

export const FollowersProviders = ({children}) => {
    

    return (
        <FollowersContext.Provider>{ children }</FollowersContext.Provider>
    )
}



