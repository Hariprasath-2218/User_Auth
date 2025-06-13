import axios from "axios";
import { getUserData } from "./Storage";

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1';
const API_KEY = 'AIzaSyBAd_2iS5XL4ryiS6Hgut7ErGLQUlnVyOY';
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USER_URL = `/accounts:lookup?key=${API_KEY}`;

export const RegisterApi = (input) => {
    const data = {displayName:input.name,email:input.email,password:input.password};
    return axios.post(REGISTER_URL,data);
}

export const LoginApi = (input) => {
    const data = {email:input.email,password:input.password};
    return axios.post(LOGIN_URL,data);
}

export const UserDetailApi = () => {
    let data = {idToken:getUserData()}
    return axios.post(USER_URL,data);
}