import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {useToken} from "../auth/useToken";

export const LogInPage = () => {
    const [, setToken] = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [shouldShowPassword, setShouldShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onLogInClicked = async () => {
        try {
            const response = await axios.post('/api/login', {
                email,
                password
            });

            const {token} = response.data;
            setToken(token);
            history.push('/');
        } catch(e) {
            console.log('login failed');
            console.log(e);
            setErrorMessage('Invalid username and password');
        }
    };

    return (
        <div className={"content-container"}>
            <h1>Log In</h1>
            {errorMessage && <p className={"fail"}>{errorMessage}</p> }
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