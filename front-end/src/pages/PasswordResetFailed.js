import {useAutoRedirect} from "../util/useAutoRedirect";
export const PasswordResetFailed = () => {
    useAutoRedirect('/login', 3000);
    return (
        <div className={"content-container"}>
            <h1>Password Reset Failed</h1>
            <p>Please try again later.</p>
            <p>Redirecting to login in 3 seconds...</p>
        </div>
    );
};