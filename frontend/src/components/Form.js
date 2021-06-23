import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from "styled-components/macro"

import { USER_URL } from '../reusable/urls'

import user from '../reducers/user'

const Container = styled.div`
  justify-content: center;
  font-size: 30px;
  padding: 40px;
  color: #f1dbb3;
`

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 35px 40px 35px 40px 70px 60px;
  row-gap: 10px; 
`

const Label = styled.label`
  margin: 0;
`

const Button = styled.button`
  background-color: #f1dbb3; 
  border: 1px solid #4B3D2D;
  color: #4B3D2D;
  padding: 5px 5px;
  text-align: center;
  background-color: #f1dbb3; 
  border: 1px solid #4B3D2D;
  color: #4B3D2D;
  font-size: 14px;
  font-weight: 700;
  width: 100px;
  height: 40px;
  align-self: flex-end;
`

const Input = styled.input`
  font-size: 14px;
  background-color: #f1dbb3;
  padding: 4px;
  width: 150px;
`

const StyledLink = styled(Link)`
  color: #f1dbb3;
  text-decoration: none;
  font-size: 16px;
`

const Form = ({ username, setUsername, password, setPassword, mode, title, link, linkDescription }) => {

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }

    fetch(USER_URL(mode), config)
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
          localStorage.setItem("user", JSON.stringify({
            username: data.username,
            accessToken: data.accessToken,
            userId: data.userId
          }))
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }

  return (
    <Container>
      <form className="registration-form" onSubmit={onFormSubmit}>
        <InnerContainer>
          <Label htmlFor="username">
            Användarnamn:
          </Label>  
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label htmlFor="password">
            Lösenord:
          </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors && <p>{errors.message}</p>}
          <Button type="submit" >{title}</Button>
          <StyledLink to={link}>{linkDescription}</StyledLink>
        </InnerContainer>
      </form>
    </Container>
  )
}
export default Form