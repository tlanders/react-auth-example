import {useState} from "react";
import axios from 'axios';

export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState('');

    const onForgotPasswordClick = async () => {
        try {
            await axios.put(`/api/forgot-password/${email}`);
            setIsSuccess(true);
            setErrorMessage('');

            // useAutoRedirect('/', 5000);
        } catch(e) {
            console.log('password reset email failed');
            console.log(e);
            setIsSuccess(false);
            setErrorMessage("Unable to send password reset email.");
        }
    }
    if(isSuccess) {
        return (
            <>
                <div className={"content-container"}>
                    <h1>Forgot Password</h1>
                    {isSuccess && (<p>Success! Check your email for a reset link.</p>)}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={"content-container"}>
                    <h1>Forgot Password</h1>
                    <p>Enter your email and we'll send you a reset link.</p>
                    {errorMessage && <div>{errorMessage}</div>}
                    <input value={email}
                           placeholder={"someone@gmail.com"}
                           onChange={e => setEmail(e.target.value)}
                           type={"email"}
                           />
                    <button
                        disabled={!email}
                        onClick={onForgotPasswordClick}
                    >Send Password Reset Email</button>
                </div>
            </>
        )
    }

}