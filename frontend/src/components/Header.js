import React from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  width: 100%;
  position: fixed;
  justify-items: center;
  color: #463727;
  background-color: #f1dbb3;
  box-sizing: border-box;
  font-family: 'Viaoda Libre', cursive;
  padding-left: 10px;
  margin:0;
`

const MainHeader = styled.h1`
  margin: 0;
  font-size: 45px;
`

const Header = () => {
  return (
    <Container>
      <MainHeader>KonstRundan</MainHeader>
    </Container>
  )
}

export default Header

