import {useState} from "react";
import {useHistory} from "react-router-dom";

export const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [shouldShowPassword, setShouldShowPassword] = useState(false);
    const history = useHistory();

    const onSignUpClicked = () => {
        alert('not done yet');
    };

    return (
        <div className={"content-container"}>
            <h1>Sign Up</h1>
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
            <input
                placeholder={"confirm password"}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <button onClick={() => setShouldShowPassword(!shouldShowPassword)}>Show password</button>
            <button onClick={onSignUpClicked}>Sign Up</button>
            <button onClick={() => history.push('/login')}>Already have an account? Log in</button>
        </div>
    )
};

export default SignUpPage;