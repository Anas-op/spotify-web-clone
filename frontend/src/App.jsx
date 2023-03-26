import React, { useState, useEffect } from 'react'
import {token} from "./spotify"

import LoginScreen from './components/LoginScreen'
import Profile from './components/Profile'

import styled from 'styled-components'
import {GlobalStyle} from './styles'


const AppContainer = styled.div`
height: 100%;
min-height: 100vh;`

const BackgroundContainer = styled.div`
background-image:url('/images/gradient.jpg');
background-repeat: no-repeat;
background-size: 100% 100%;
min-height: 100%;
position:absolute;
transform: rotate(180deg);
width:100%;
z-index:-1;
&:after{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(60px); 
  pointer-events: none; 
  z-index:0;
}

`


function App() {
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    setAccessToken(token);
  }, [])


  return (
    <AppContainer>
      <BackgroundContainer />
        <GlobalStyle />
        {accessToken ? <Profile /> : <LoginScreen />}
   
    </AppContainer>
  )
}

export default App
