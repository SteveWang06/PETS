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

const LengthContext = createContext({});
export const LengthProvider=({ children })=>{
    const [postLength, setPostLength] = useState(0);
    const [userLength, setUserLength] = useState(0);
    const [productLength, setProductLength] = useState(0);

    return(
        <LengthContext.Provider value={{postLength, setPostLength, userLength, setUserLength, productLength, setProductLength}}>
            {children}
        </LengthContext.Provider>
    );
};

export {AuthContext, LengthContext};