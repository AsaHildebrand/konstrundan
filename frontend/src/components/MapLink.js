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

const MapLink = () => {

  const iconSrc = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="bi bi-map"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
      />
    </svg>
  )

  return (
    <Container>
      <NavLink exact to="/map" activeStyle={{ color: "#8D4807" }}>
        <InnerContainer>
          {iconSrc}
          <Title>Karta</Title>
        </InnerContainer>
      </NavLink>
    </Container>
  )
}
export default MapLink
