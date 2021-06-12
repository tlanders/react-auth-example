import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";
import axios from "axios";

export const UserInfoPage = () => {
    // We'll use the history to navigate the user
    // programmatically later on (we're not using it yet)
    const history = useHistory();

    const [token, setToken] = useToken();
    const user = useUser();
    // console.log(user);
    const {id, email, info} = user;

    // These states are bound to the values of the text inputs
    // on the page (see JSX below). 
    const [favoriteFood, setFavoriteFood] = useState(info ? info.favoriteFood || '' : '');
    const [hairColor, setHairColor] = useState(info ? info.hairColor || '' : '');
    const [bio, setBio] = useState(info ? info.bio || '' : '');

    // These state variables control whether or not we show
    // the success and error message sections after making
    // a network request (see JSX below).
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showGetVerifiedMessage, setShowGetVerifiedMessage] = useState(!user.isVerified);

    // This useEffect hook automatically hides the
    // success and error messages after 3 seconds when they're shown.
    // Just a little user interface improvement.
    useEffect(() => {
        if (showSuccessMessage || showErrorMessage || showGetVerifiedMessage) {
            console.log('setting timeout for page messages');
            setTimeout(() => {
                console.log('clearing page messages');
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
                setShowGetVerifiedMessage(false);
            }, 5000);
        }
    }, [showSuccessMessage, showErrorMessage, showGetVerifiedMessage]);

    const saveChanges = async () => {
        try {
            const response = await axios.put(`/api/users/${id}`, {
                favoriteFood,
                hairColor,
                bio
            }, {
                headers: {Authorization: `Bearer ${token}`}
            });

            const {token: newToken} = response.data;

            console.log(`user info changes saved, newToken: ${newToken}`);

            setToken(newToken);
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
        } catch(e) {
            console.log('user info save failed')
            console.log(e);
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    }

    const logOut = () => {
        // We'll want to log the user out here
        // and send them to the "login page"
        console.log('logging out');
        setToken('');
        history.push('/login');
    }
    
    const resetValues = () => {
        // Reset the text input values to
        // their starting values (the data we loaded from the server)
        alert('Reset functionality not implemented yet');
    }

    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <div className="content-container">
            <h1>Info for {email}</h1>
            {showGetVerifiedMessage && <div className="fail">Check your inbox and please verify your email address</div>}
            {showSuccessMessage && <div className="success">Successfully saved user data!</div>}
            {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes</div>}
            <label>
                Favorite Food:
                <input
                    onChange={e => setFavoriteFood(e.target.value)}
                    value={favoriteFood} />
            </label>
            <label>
                Hair Color:
                <input
                    onChange={e => setHairColor(e.target.value)}
                    value={hairColor} />
            </label>
            <label>
                Bio:
                <input
                    onChange={e => setBio(e.target.value)}
                    value={bio} />
            </label>
            <hr />
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={resetValues}>Reset Values</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}