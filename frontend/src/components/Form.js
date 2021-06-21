import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import user from '../reducers/user'

import { USER_URL } from '../reusable/urls'

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  font-size: 30px;
  margin: 20px;
  color: #f1dbb3

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
margin:5px;
`

const Input = styled.input`
  font-size: 14px;
  background-color: #f1dbb3;
  margin: 10px;
  padding: 4px;
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
      history.push('/cities')
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
            //username is not saved to store
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setUserId(data.userId))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
            console.log(data.userId)
          })
          localStorage.setItem("user", JSON.stringify({
            username: data.username,
            accessToken: data.accessToken,
            userId: data.userId
          }))
        } else {
          dispatch(user.actions.setErrors(data))
          console.log("error")
        }
      })
      .catch()
  }

  return (
    <Container>
      <form className="registration-form" onSubmit={onFormSubmit}>
        <label htmlFor="username">
          Användarnamn:
        </label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">
          Lösenord:
        </label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors && <p>{errors.message}</p>}
        <Button type="submit" >{title}</Button>
        <StyledLink to={link}>{linkDescription}</StyledLink>
      </form>
    </Container>
  )
}
export default Form