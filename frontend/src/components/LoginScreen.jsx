import React from 'react';
import styled from "styled-components";
import {theme, mixins, Main} from "../styles";
import IconSpotify from './icons/IconSpotify';
const {colors, fontSizes, fonts} = theme;


const LOGIN_URI = 
    process.env.NODE_ENV !== 'production'
     ? 'http://localhost:8888/login'
     : 'https:/localhost:8888/login';

const Login = styled(Main)`
    ${mixins.flexCenter};
    flex-direction: column;
    min-height: 100vh;
    background-image: url('/images/gradient.jpg')
    text-align:center;
    justify-content:flex-center;
    h1 {
        width: 280px;
        text-align:center;
        font-size:28px;
        margin-top:10px;
        font-family: ${fonts.primary};
        z-index:1;
    }
    `;


    const LoginButton = styled.a`
    display: inline-block;
    background-color: ${colors.transparent};
    color: ${colors.white};
    border: 1px solid white;
    border-radius: 30px;
    padding: 15px 90px;
    margin: 25px 0 70px;
    z-index:1;
    min-width: 100px;
    font-weight:700;
    font-family:${fonts.primary};
    font-size: 16px;
    text-align: center;
    &:hover,
    &:focus {
      background-color: ${colors.white};
      color:${colors.darkGrey};
    }
  `;





const LoginScreen = () => {
    return (
        <Login>
            <IconSpotify />
            <h1>Explore your favorite artists!</h1>
            <LoginButton href={LOGIN_URI}>Log in to Spotify</LoginButton>
        </Login>
    );
}

export default LoginScreen;
