
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";

  import { createContext, useEffect, useState } from "react";
import app from "../Firbase/firebase-config";
import useAxiosPublic from "../hooks/useAxiosPublic";
  
  const auth = getAuth(app);

  
  export const AuthContext = createContext({});
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const login = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if(currentUser){
          const userInfo = {email: currentUser.email}
          axiosPublic.post('/jwt',userInfo)
          .then(res=>{
            if(res.data.token){
              localStorage.setItem('access-token',res.data.token)
            }

          })
          
        } else{
          localStorage.removeItem('access-token')
        }

        setLoading(false);
      });
      return () => unsubscribe();
    }, []);
  
    const authInfo = {
      user,
      loading,
      createUser,
      login,
      logOut,
    };
  
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  