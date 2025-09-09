import { createContext, useState } from "react";

export const UserContext = createContext()


export default function UserProvider({children}) {
    const [user,setUser]= useState(JSON.parse(localStorage.getItem("user")) || null);
    console.log(user)

    const userlogin = (data)=> {
        setUser(data);
        localStorage.setItem("user",JSON.stringify(data))
    }
    
    const userlogout =() =>{
        setUser(null);
        localStorage.removeItem("user")
    }
     
  return (
    <div>
        <UserContext.Provider value={{user ,userlogin ,userlogout}}>
            {children}
        </UserContext.Provider>
    </div>
  )
}
