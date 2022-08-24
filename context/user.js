import { Layout } from '../layout';
import React,{ createContext,useState,useContext,useEffect,useMemo } from 'react'
import { signOut } from "next-auth/react"
import { signIn, useSession } from "next-auth/react";
import { LoaderBar } from '../components';
import Router, { useRouter } from 'next/router';
import { replace } from 'formik';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const { data: session, status } = useSession()

    useEffect(() => {
        checkAuth()
      },[status])

    
    const checkAuth = async() => {
        if(status=="loading"){
            setLoading(true)
        }
        if (status === "authenticated") {
            setIsAuthenticated(true);
            setLoading(false)
          }
          else{
            setIsAuthenticated(false);
            setLoading(false)
          }
    }

    const login = (data) => {
        signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });
        Router.push("/pages")
        setIsAuthenticated(true);
    }

    const logout = () => {
        signOut({ callbackUrl: 'http://localhost:3000/' })
        setIsAuthenticated(false);
    }

    const contextData = useMemo(() => ({
        loading,
        user,
        isAuthenticated,
        login,
        logout,status
    }),[loading,user,isAuthenticated,login,logout,status])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({
    redirectPath = '/',
    children,
}) => {
    const { isAuthenticated,loading,status } = useAuth();
    const { replace } = useRouter()

    if(status=="loading") {
        return <LoaderBar/>
    }

    if (status=="unauthenticated") {
        replace("/login")
    }
 
    return (
        <Layout>
        {children}
    </Layout>)
}
