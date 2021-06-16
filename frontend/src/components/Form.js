import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import user from '../reducers/user'

import { USER_URL } from '../reusable/urls'

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
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
            console.log(data.username)
          })
          localStorage.setItem("user", JSON.stringify({
            username: data.username,
            accessToken: data.accessToken
          }))
        } else {
          dispatch(user.actions.setErrors(data))
          console.log("error")
        }
      })
      .catch()
  }

  return (
    <>
      <form className="registration-form" onSubmit={onFormSubmit}>
        <label htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <label htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors && <p>{errors.message}</p>}
        <button type="submit" >{title}</button>
        <Link to={link}>{linkDescription}</Link>
      </form>
    </>
  )
}
export default Form