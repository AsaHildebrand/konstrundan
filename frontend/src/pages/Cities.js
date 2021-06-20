import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import city from "../reducers/city";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #f1dbb3;
  align-items: center;
  font-family: 'Lora', serif;
  font-style: italic;
  font-size: 40px;
`;

const Button = styled.button`
background-color: #f1dbb3; 
border: 1px solid #4B3D2D;
color: #4B3D2D;
padding: 8px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 30px;
font-weight: 700;
margin:0 0 20px 20px;
align-self: flex-start;
`

const Cities = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken)

  const cities = [
    {
       city: "Karlstad",
       center: [59.3855, 13.5000],
       zoom: 13
     },
     {
      city: "Uppsala",
      center: [59.858562, 17.638928],
       zoom: 11
    },
  ];

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  })
    
  return (
    <Container>
      <p>Välj stad!</p>

      {cities.map((singleCity) => (
        <Link exact to="/" key={singleCity.city}>
          <Button
            onClick={() => dispatch(city.actions.setCurrentCity(singleCity))}>
            {singleCity.city}
          </Button>
        </Link>
      ))}
    </Container>
  );
};
export default Cities;
