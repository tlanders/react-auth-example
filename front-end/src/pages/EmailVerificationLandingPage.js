import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useToken} from "../auth/useToken";
import {EmailVerificationSuccess} from "./EmailVerificationSuccess";
import {EmailVerificationFailed} from "./EmailVerificationFailed";

export const EmailVerificationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const {verificationString} = useParams();
    const [,setToken] = useToken();

    console.log(`email landing, verificationString=${verificationString}`);
    useEffect(() => {
        const loadVerification = async () => {
            try {
                const response = await axios.put('/api/verify-email', {
                    verificationString
                });
                const {token} = response.data;

                console.log('verification success');
                setToken(token);
                setIsSuccess(true);
                setIsLoading(false);
            } catch(e) {
                console.log('verification failed');
                console.log(e);
                setIsSuccess(false);
                setIsLoading(false);
            }
        };

        console.log('loading verification');
        loadVerification();
    }, [verificationString]);

    if(isLoading) {
        return <p>Loading...</p>;
    } else if(isSuccess) {
        return <EmailVerificationSuccess/>;
    } else {
        return <EmailVerificationFailed/>;
    }
}

export default EmailVerificationLandingPage;