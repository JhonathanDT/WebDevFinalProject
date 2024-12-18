import { useEffect, useState } from "react";
import axios from "axios";
// import React from 'react'

export default function useAuth(code) {
    // console.log("hello from the useAuth function ");
    const [accessToken , setAccessToken] = useState()
    const [refreshToken , setRefreshToken] = useState()
    const [expiresIn , setExpiresIn] = useState()

    // console.log("we are in the UseAuth and are checking for you refreshToken which is \n\n",refreshToken);

    useEffect(() =>{
        axios.post(`http://localhost:3001/login`,{
            code,
        }).then(res =>{
            // console.log(res.data);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({},null,'/')
        })
        .catch((err) => {
            // console.log(err)
            window.location = '/'
        })
    }, [code])

    useEffect( () => {
        if(!refreshToken || !expiresIn)
        return;
        const interval = setInterval( () =>{
            axios.post(`http://localhost:3001/refresh`,{
            refreshToken,
            }).then(res =>{
                // console.log(res.data);
                setAccessToken(res.data.accessToken);
                // setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                // window.history.pushState({},null,'/')
                // console.log("refresh token success\n\n\n");
            })
            .catch(() => {
                // console.log(err)
                // console.log("refresh token error")
                window.location = '/'
            })
        }, (expiresIn - 60)*1000)

        return() => clearInterval(interval);

    }, [refreshToken , expiresIn])

    return accessToken;
}