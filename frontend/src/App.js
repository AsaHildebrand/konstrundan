import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import MapContainer from './components/MapContainer'
import SelectedArtwork from './pages/SelectedArtwork'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import ProfilePage from './pages/ProfilePage'
import Cities from './pages/Cities'
import NavBar from './components/NavBar'

import user from './reducers/user'
import artwork from './reducers/artwork'
import city from './reducers/city'

const reducer = combineReducers({
  user: user.reducer,
  artwork: artwork.reducer,
  city: city.reducer,
});
const store = configureStore({ reducer })

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <NavBar />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route exact path='/' component={Cities} />
            <Route path='/min-sida' component={ProfilePage} />
            <Route path='/map' component={MapContainer} />
            <Route path='/artwork' component={SelectedArtwork} />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  )
}
