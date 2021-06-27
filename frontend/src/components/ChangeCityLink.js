import React from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components/macro"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  a:link {
    color: #4B3D2D;
    text-decoration: none;
  }
  a:visited {
    color: #4B3D2D;
    text-decoration: none;
  }
  a:hover {
    color: #8a745c;
  }
  a:active {
    color: white;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.p`
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
`;

const ChangeCityLink = () => {
  const iconSrc = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="currentColor"
      className="bi bi-signpost-split"
      viewBox="0 0 16 16"
    >
      <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7h5zm1 3V8H2l-.75 1L2 10h6zm0-5h6l.75-1L14 3H8v2z" />
    </svg>
  )

  return (
    <Container>
      <NavLink exact to="/" activeStyle={{ color: "#8D4807" }}>
        <InnerContainer>
          {iconSrc}
          <Title>Byta stad</Title>
        </InnerContainer>
      </NavLink>
    </Container>
  )
}
export default ChangeCityLink