import {createContext, useState, useEffect} from "react"
import axios from 'axios'
import { baseURL } from "../pathApi";

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

    const fetchData = async () => {
        try {
          const token = localStorage.getItem('userToken');
          if (!token) {
            throw new Error('No token found');
          }

          const [postRes, userRes, productRes] = await Promise.all([
            axios.get(`${baseURL.baseURL}/api/auth/post/`, {
              headers: { 'Authorization': `Bearer ${token}` }
            }),
            axios.get(`${baseURL.baseURL}/api/auth/user`, {
              headers: { 'Authorization': `Bearer ${token}` }
            }),
            axios.get(`${baseURL.baseURL}/api/products`, {
              headers: { 'Authorization': `Bearer ${token}` }
            })
          ]);
    
          setPostLength(postRes.data.length);
          setUserLength(userRes.data.length);
          setProductLength(productRes.data.length);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

    return(
        <LengthContext.Provider value={{postLength, setPostLength, userLength, setUserLength, productLength, setProductLength, fetchData}}>
            {children}
        </LengthContext.Provider>
    );
};

export {AuthContext, LengthContext};