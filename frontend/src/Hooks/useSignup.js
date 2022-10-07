import axios from 'axios';
import React, { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { axiosInstance } from '../config'

export const useSignup = () => {

    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState('');

    const { dispatch } = useAuthContext();


    const signup = async (email, password, name) => {

        try {
            setIsLoading(true)
            const signInData = { email, password, name }
            const config = {
                headers: {
                    "content-Type": "application/json",
                }
            }

            const res = await axiosInstance.post('/user/register',
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

    return { signup, isLoading, error }
}
