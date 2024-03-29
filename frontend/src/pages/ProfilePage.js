import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { RESOLVED_URL } from '../reusable/urls'

import user from '../reducers/user'

const Container = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 16px;
`

const ResolvedOuterContainer = styled.div`
  background-color: #f1dbb3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: auto;
  height: 80%;
  margin: 100px 20px;

  @media (min-width: 1024px) {
    overflow: auto;
  }
`

const ResolvedInnerContainer = styled.div`
  background-color: #f1dbb3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
`

const ListContainer = styled.div`
  padding: 0;
  margin: 0;
  width: 150px;
  font-family: 'Arial';
  font-style: normal;
  font-size: 16px;

  @media (min-width: 1024px) {
    width: 300px;
    padding-left: 100px;
  }
`

const Header = styled.h2`
  text-align: center;
  margin: 0;
`

const List = styled.ul`
  padding: 0;
`

const Text = styled.li`
  font-size: 16px;
  margin: 5px 0;
  list-style-type: none;
`
const Message = styled.p`
  background-color: #BDDAB1;
  padding: 3px;
  width: 90%;
  border: 1px solid black;
  font-weight: 700px;
  font-size: 16px;
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
      history.push('/login')
    }
  })

  useEffect(() => {
    if (userId && accessToken) {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }
      const currentCity1 = 'Karlstad'
      fetch(RESOLVED_URL(currentCity1, userId), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            dispatch(user.actions.setResolvedKarlstad(data.resolvedArtWorksByUser))
          } else {
            alert(data.message)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (userId && accessToken) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken
        }
      }
      const currentCity2 = 'Uppsala'
      fetch(RESOLVED_URL(currentCity2, userId), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            dispatch(user.actions.setResolvedUppsala(data.resolvedArtWorksByUser))
          } else {
            alert(data.message)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sortedKarlstad = resolvedKarlstad.slice().sort((a, b) => (a.artwork.id > b.artwork.id) ? 1 : -1)
  const sortedUppsala = resolvedUppsala.slice().sort((a, b) => (a.artwork.id > b.artwork.id) ? 1 : -1)

  return (
    <Container>
      <ResolvedOuterContainer>
        <Header>{username}s funna konstverk</Header>
        <ResolvedInnerContainer>
          <ListContainer>
            <h3>Karlstad</h3>
            {sortedKarlstad.length === 20 && <Message><span role='img' aria-label="trofé">🏆</span> Alla funna i Karlstad!</Message>}
            <List>
              {sortedKarlstad.map((item) => {
                return (
                  <Text key={item.artwork.title}>{item.artwork.id}.{' '}{item.artwork.title}</Text>
                )
              })}
            </List>
          </ListContainer>
          <ListContainer>
            <h3>Uppsala</h3>
            {sortedUppsala.length === 14 && <Message><span role='img' aria-label="trofé">🏆</span> Alla funna i Uppsala!</Message>}
            <List>
              {sortedUppsala.map((item) => {
                return (
                  <Text key={item.artwork.title}>{item.artwork.id}.{' '}{item.artwork.title}</Text>
                )
              })}
            </List>
          </ListContainer>
        </ResolvedInnerContainer>
      </ResolvedOuterContainer>
    </Container>
  )
}
export default ProfilePage