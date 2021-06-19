import {useAutoRedirect} from "../util/useAutoRedirect";

export const PasswordResetSuccess = () => {
    useAutoRedirect('/login', 5000);

    return (
        <div className={"content-container"}>
            <h1>Success!</h1>
            <p>Your password has been reset.</p>
            <p>Redirecting to login in 5 seconds...</p>
        </div>
    );
}