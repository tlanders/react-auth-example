import {useAutoRedirect} from "../util/useAutoRedirect";

export const EmailVerificationFailed = () => {
    useAutoRedirect('/login', 3000);
    return (
        <div className={"content-container"}><h1>Email Verification Failed</h1></div>
    );
}