import React, { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { axiosInstance } from '../config';
import axios from 'axios';


export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState('');

    const { dispatch } = useAuthContext();


    const Login = async (email, password) => {

        try {
            setIsLoading(true)
            const signInData = { email, password, }
            const config = {
                headers: {
                    "content-Type": "application/json",
                }
            }

            const res = await axiosInstance.post('/user/login',
                signInData,
                config
            )

            // update the auth context with user email and token
            dispatch({ type: 'LOGIN', payload: res.data })

            // save the user email and token to local storage
            localStorage.setItem('user', JSON.stringify(res.data))

            setIsLoading(false)

        } catch (err) {
            setError(`error: ${err.response.data.err}`)
            setIsLoading(false)
        }
    }

    return { Login, isLoading, error }
}
