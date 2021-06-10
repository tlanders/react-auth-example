import {useState} from "react";
import {useHistory} from "react-router-dom";

export const LogInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    const onLogInClicked = () => {
        alert('not done yet');
    };

    return (
        <div className={"content-container"}>
            <h1>Log In</h1>
            <input
                placeholder={"someone@gmail.com"}
                value={email}
                onChange={e => setEmail(e.target.value)}
                type={"email"}
            />
            <input
                placeholder={"password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={shouldShowPassword ? "text" : "password"}
            />
            <button onClick={() => setShouldShowPassword(!shouldShowPassword)}>Show password</button>
            <button onClick={onLogInClicked}>Log In</button>
            <button onClick={() => history.push('/forgot-password')}>Forgot your password</button>
            <button onClick={() => history.push('/signup')}>Don't have an account? Sign up</button>
        </div>
    )
};

export default LogInPage;