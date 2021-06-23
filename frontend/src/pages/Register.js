import React, { useState } from 'react'
import styled from "styled-components/macro"

import Form from '../components/Form'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 40px;
`

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        mode="users"
        title="Registrera"
        link="/"
        linkDescription="Har du redan ett användarkonto? Logga in här!"
      />
    </Container>
  )
}
export default Register