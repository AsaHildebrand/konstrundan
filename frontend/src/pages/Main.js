import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import MapContainer from '../components/MapContainer'
import SelectedArtwork from './SelectedArtwork'
import ProfilePage from './ProfilePage'
import Cities from './Cities'
import NavBar from '../components/NavBar'

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin:0;
  `

const Main = () => {
  const artworkId = useSelector((store) => store.artwork.artworkId)
  const accessToken = useSelector((store) => store.user.accessToken)
  
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  })


  return (
    <BrowserRouter>
      <Container>
        <NavBar />
          <Switch>
            <Route exact path="/">
            {artworkId && <SelectedArtwork/>}
            {!artworkId && <MapContainer/>} 
            </Route>
            <Route path="/min-sida">
              <ProfilePage/>
            </Route>
            <Route path="/cities">
              <Cities/>
            </Route>
          </Switch>
      </Container>
    </BrowserRouter>
  )
}
export default Main