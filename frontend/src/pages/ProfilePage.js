import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { RESOLVED_URL } from '../reusable/urls'

import user from '../reducers/user'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 16px;
`;

const ListContainer = styled.div`
  background-color: #f1dbb3;
  padding: 20px;
`
const WelcomeText = styled.p`
  color: #f1dbb3;
  font-size: 24px;
`


const ProfilePage = () => {
  const username = useSelector((store) => store.user.username)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const resolvedKarlstad = useSelector((store) => store.user.resolvedKarlstad)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push("/");
    }
  })

  useEffect(() => {
    if (userId) {
      console.log(userId)
      const currentCity1 = "Karlstad"
      fetch(RESOLVED_URL(currentCity1, userId))
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            console.log(data.resolvedArtWorksByUser[0].artwork)
            //kan vi mappa och få ut bara array mede artwork?
            dispatch(user.actions.setResolvedKarlstad(data.resolvedArtWorksByUser))
          } else {
            console.log("Den gubben gick inte!")
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (userId) {
      console.log(userId)
      const currentCity2 = "Uppsala"
      fetch(RESOLVED_URL(currentCity2, userId))
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            console.log(data.resolvedArtWorksByUser[0].artwork)
            //kan vi mappa och få ut bara array mede artwork?
            dispatch(user.actions.setResolvedUppsala(data.resolvedArtWorksByUser))
          } else {
            console.log("Den gubben gick inte!")
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <WelcomeText>Välkommen {username}!</WelcomeText>
      <ListContainer>
        <h2>Karlstad</h2>
        {resolvedKarlstad.map((item) => {
          return (
            <>
              <p>{item.artwork.id}{item.artwork.title}</p>
            </>
          )
        })}
      </ListContainer>
    </Container>
  )
}
export default ProfilePage