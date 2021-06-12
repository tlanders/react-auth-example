import { testRoute } from './testRoute';
import {signUpRoute} from "./signUpRoute";
import {logInRoute} from "./loginRoute";
import {updateUserInfoRoute} from "./updateUserInfoRoute";
import {verifyEmailRoute} from "./verifyEmailRoute";
import {forgotPasswordRoute} from "./forgotPasswordRoute";
import {resetPasswordRoute} from "./resetPasswordRoute";

export const routes = [
    forgotPasswordRoute,
    logInRoute,
    resetPasswordRoute,
    signUpRoute,
    testRoute,
    updateUserInfoRoute,
    verifyEmailRoute
];
