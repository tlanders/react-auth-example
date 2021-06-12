import {useState} from "react";

export const useToken = () => {
    const [token, setTokenInternal]= useState(() => {
        return localStorage.getItem('token');
    });

    const setToken = newToken => {
        console.log('useToken - setting token');
        console.log(newToken);
        localStorage.setItem('token', newToken);
        setTokenInternal(newToken);
    };

    return [token, setToken];
}