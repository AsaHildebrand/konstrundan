import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

import MapLink from "./MapLink";
import ChangeCityLink from "./ChangeCityLink";
import ProfilepageLink from "./ProfilepageLink";
import LogoutLink from "./LogoutLink";

const Container = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  background-color: #f1dbb3;
  padding: 10px;
  box-sizing: border-box;
  color: white; 
`;

const NavBar = () => {
  const accessToken = useSelector((store) => store.user.accessToken)

  return (
    accessToken &&
    <Container>
      <MapLink/>
      <ChangeCityLink/>
      <ProfilepageLink/>
      <LogoutLink/>
    </Container>
  );
};
export default NavBar;
