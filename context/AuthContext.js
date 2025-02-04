// import { onAuthStateChanged,createUserWithEmailAndPassword,sendEmailVerification } from "@react-native-firebase/auth";
import { createContext, useEffect, useState, useContext } from "react";
import {auth, db} from '../firebaseConfig'
import { doc,getDoc,setDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut } from "@firebase/auth";



export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // setTimeout(() => {
    //   setIsAuthenticated(true);
    // }, 3000);

    const unsub= onAuthStateChanged(auth,(user)=>{
      // console.log(user)
      if(user){
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid)
      }else{
        setIsAuthenticated(false);
        setUser(null);
      }
    })
    return unsub
  }, []);
  const updateUserData =async (userId)=>{
    const docRef =doc(db,'users',userId);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists()){
      let data=docSnap.data();
      setUser({...user,email:data.email,userId:data.userId})
    }
  }

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth,email,password);
      return {success:true}
    } catch (e) {
      return (e)
    }
  };

  const logout = async () => {
    try {
      await signOut(auth)
      return{success:true}
    } catch (e) {
      return{success:false }
    }
  };

  const register = async ( email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth,email,password)
      console.log('response.user:',response?.user);
      
      await setDoc(doc(db,"users",response?.user?.uid),{
        
        email,
        userId:response?.user?.uid
      });
      return{success:true,data:response?.user}
    } catch (e) {
      return{success:false,message:e.message}

    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return value;
};
