import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useToken} from "../auth/useToken";
import axios from "axios";

export const SignUpPage = () => {
    const [, setToken] = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [shouldShowPassword, setShouldShowPassword] = useState(false);
    const [formError, setFormError] = useState('');
    const history = useHistory();

    const onSignUpClicked = async () => {
        // TODO - validate form first
        if(password !== confirmPassword) {
            setFormError('Passwords must match');
        } else {
            setFormError('');

            try {
                const response = await axios.post('/api/signup', {
                    email,
                    password
                });
                const {token} = response.data;
                setToken(token);
                setFormError('');

                history.push('/');
            } catch(e) {
                console.log('signup error');
                console.log(e);
                setFormError('Unable to signup at this time. Please try again later.');
            }
        }
    };

    return (
        <div className={"content-container"}>
            <h1>Sign Up</h1>
            {formError && <p className={"fail"}>{formError}</p>}
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
                type={shouldShowPassword ? "text" : "password"}
            />
            <button onClick={() => setShouldShowPassword(!shouldShowPassword)}>Show password</button>
            <button onClick={onSignUpClicked}>Sign Up</button>
            <button onClick={() => history.push('/login')}>Already have an account? Log in</button>
        </div>
    )
};

export default SignUpPage;