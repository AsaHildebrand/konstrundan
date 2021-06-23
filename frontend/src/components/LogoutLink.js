import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, batch } from "react-redux";
import styled from "styled-components/macro";

import user from "../reducers/user"

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

const LogoutLink = () => {
  const dispatch = useDispatch()

  const onLogoutButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUserId(null))
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
    })
    localStorage.removeItem("user")
  }

  const iconSrc=(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="bi bi-box-arrow-right"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
      />
      <path
        fillRule="evenodd"
        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
      />
    </svg>
  )

  return (
    <Container>
      <NavLink exact to="/login" onClick={onLogoutButtonClick} activeStyle={{ color: "#8D4807" }}>
        <InnerContainer>
        {iconSrc}
        <Title>Logga ut</Title>
        </InnerContainer>
      </NavLink>
    </Container>
  );
};
export default LogoutLink;
