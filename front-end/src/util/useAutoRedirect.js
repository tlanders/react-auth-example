import {useEffect} from "react";
import {useHistory} from "react-router-dom";

export const useAutoRedirect = (url, delay = 3000) => {
    const history = useHistory();

    useEffect(() => {
        console.log(`setting timeout for page redirect to ${url}`);
        setTimeout(() => {
            history.push(url);
        }, delay);
    }, [history, delay, url]);
};