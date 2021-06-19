import {useAutoRedirect} from "../util/useAutoRedirect";

export const PleaseVerifyEmailPage = () => {
    useAutoRedirect('/', 5000);

    return (
        <div className={"content-container"}>
            <h1>Thanks for signing up!</h1>
            <p>
                A verification email has been set. Please verify your email to unlock the full site features.
            </p>
            <p>
                Redirecting you to the site in 5 seconds...
            </p>
        </div>
    );
}

export default PleaseVerifyEmailPage;