import {useAutoRedirect} from "../util/useAutoRedirect";

export const EmailVerificationSuccess = () => {
    useAutoRedirect('/', 5000);

    return (
        <div className={"content-container"}>
            <h1>Success!</h1>
            <p>Thanks for verifying your email.</p>
            <p>Redirecting to the site in 5 seconds...</p>
        </div>
    );
}