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
  padding: 20px;
  width: 120px;
  font-family: "Arial";
  font-style: normal;
  font-size: 16px;

  @media (min-width: 1024px) {
    width: 250px;
    
  }
`

const ResolvedContainer = styled.div`
  background-color: #f1dbb3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin: 20px;

  @media (min-width: 1024px) {
   
  }
`

const WelcomeText = styled.p`
  color: #f1dbb3;
  font-size: 24px;
`

const Text = styled.p`
@media (min-width: 1024px) {

}
  
`



const ProfilePage = () => {
  const username = useSelector((store) => store.user.username)
  const accessToken = useSelector((store) => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)
  const resolvedKarlstad = useSelector((store) => store.user.resolvedKarlstad)
  const resolvedUppsala = useSelector((store) => store.user.resolvedUppsala)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  })

  useEffect(() => {
    if (userId) {
      console.log(userId)
      const currentCity1 = "Karlstad"
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }

      fetch(RESOLVED_URL(currentCity1, userId), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
        
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

      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }

      fetch(RESOLVED_URL(currentCity2, userId), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            
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
      <ResolvedContainer>
        <ListContainer>
          <h2>Karlstad</h2>
          {resolvedKarlstad.map((item) => {
            return (
              <>
                <Text>{item.artwork.id}.{" "}{item.artwork.title}</Text>
              </>
            )
          })}
        </ListContainer>
        <ListContainer>
          <h2>Uppsala</h2>
          {resolvedUppsala.map((item) => {
            return (
              <>
                <Text>{item.artwork.id}.{" "}{item.artwork.title}</Text>
              </>
            )
          })}
        </ListContainer>
      </ResolvedContainer>
    </Container>
  )
}
export default ProfilePage