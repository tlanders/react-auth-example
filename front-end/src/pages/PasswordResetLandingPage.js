import {useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {PasswordResetFailed} from "./PasswordResetFailed";
import {PasswordResetSuccess} from "./PasswordResetSuccess";

export const PasswordResetLandingPage = () => {
    const {passwordResetCode} = useParams();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if(isFailure) { return <PasswordResetFailed/> }
    if(isSuccess) { return <PasswordResetSuccess/> }

    const onResetPassword = async () => {
        try {
            await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
                newPassword: password,
            });
            setIsFailure(false);
            setIsSuccess(true);
            console.log('reset password success');
        } catch(e) {
            console.log('reset password failed');
            console.log(e);
            setIsFailure(true);
        }
    }

    return (
        <div className={"content-container"}>
            <h1>Reset Password</h1>
            <p>Please enter a new password.</p>
            <input value={password}
                   type={"password"}
                   placeholder={"password"}
                   onChange={(e) => setPassword(e.target.value)}
                   />
            <input value={confirmPassword}
                   type={"password"}
                   placeholder={"confirm password"}
                   onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button disabled={!password || !confirmPassword || password !== confirmPassword}
                onClick={onResetPassword}
                    >Reset Password</button>
        </div>

    );
}