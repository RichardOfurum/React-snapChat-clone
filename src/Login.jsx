import { Button } from '@material-ui/core';
import React from 'react';
import "./styles/Login.css";
import { useDispatch } from 'react-redux';
import { auth, provider } from './firebase';
import { login } from './features/appSlice';

const Login = () => {

    const  dispatch = useDispatch(login);

    const signin = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch(login({
                username: result.user.displayname,
                profilePic: result.user.photoURL,
                id: result.user.uid
            }))
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <div className="login">
            <div className="login_container">
                <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />

                <Button variant='outlined' onClick={signin}>Sign in</Button>
            </div>
        </div>
    )
}

export default Login
