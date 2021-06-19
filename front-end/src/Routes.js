import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import {PrivateRoute} from "./auth/PrivateRoute";
import PleaseVerifyEmailPage from "./pages/PleaseVerifyEmailPage";
import EmailVerificationLandingPage from "./pages/EmailVerificationLandingPage";
import {ForgotPasswordPage} from "./pages/ForgotPasswordPage";
import {PasswordResetLandingPage} from "./pages/PasswordResetLandingPage";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/login" exact>
                    <LogInPage />
                </Route>
                <Route path="/please-verify" exact>
                    <PleaseVerifyEmailPage />
                </Route>
                <Route path="/verify-email/:verificationString">
                    <EmailVerificationLandingPage />
                </Route>
                <Route path="/forgot-password">
                    <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password/:passwordResetCode">
                    <PasswordResetLandingPage />
                </Route>
                <Route path="/signup" exact>
                    <SignUpPage />
                </Route>
            </Switch>
        </Router>
    );
}