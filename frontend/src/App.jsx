import React, { useState, useEffect } from 'react'
import {token} from "./spotify"

import LoginScreen from './components/LoginScreen'
import MainRoute from './components/MainRoute'
import styled from 'styled-components'
import {GlobalStyle} from './styles'
import {library} from "@fortawesome/fontawesome-svg-core"
import {faMagnifyingGlass, faHouse} from "@fortawesome/free-solid-svg-icons"


library.add(faMagnifyingGlass, faHouse)



const AppContainer = styled.div`
height: 100%;
min-height: 100vh;`




function App() {
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    setAccessToken(token);
  }, [])


  return (
    <AppContainer>
    
        <GlobalStyle />
        {accessToken ? <MainRoute /> : <LoginScreen />}
   
    </AppContainer>
  )
}

export default App
