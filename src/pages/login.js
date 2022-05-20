import React from 'react'
import Uauth from '@uauth/js';

const Login = () => {
    const auth = new Uauth(
        {
            clientID: process.env.REACT_APP_CLIENT_ID,
            clientSecret: process.env.REACT_APP_CLIENT_SECRET,
            redirectUri: process.env.REACT_APP_REDIRECT_URI,
            scope: "openid wallet",
        }
    );

    const login = () => {
        auth.login().then(val => {
            console.log(val);
        });
    }
  return (
    <div onClick={login}>Login</div>
  )
}

export default Login