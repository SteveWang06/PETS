import {createContext, useState} from "react"

const AuthContext = createContext({});

export const AuthProvider=({ children })=>{
    const [auth, setAuth] = useState(null);

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

const PostContext = createContext({});
export const PostProvider=({ children })=>{
    const [postLength, setPostLength] = useState(0);

    return(
        <PostContext.Provider value={{postLength, setPostLength}}>
            {children}
        </PostContext.Provider>
    );
};

export {AuthContext, PostContext};