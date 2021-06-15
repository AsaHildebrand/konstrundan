import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import city from "../reducers/city";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  const cities = [
    {
      city: "Karlstad",
      center: {
        lat: 59.40218,
        lng: 13.511498,
      },
    },
    {
      city: "Uppsala",
      center: {
        lat: 59.858562,
        lng: 17.638928,
      },
    },
  ];

  // useEffect(() => {
  //   if (city !== null) {
  //     history.push('/map')
  //   }
  // }, [city, history])

  return (
    <Container>
      <p>Välj stad!</p>

      {cities.map((singleCity) => (
        <Link to="/map" key={cities.center}>
          <Button
            onClick={() => dispatch(city.actions.setCurrentCity(singleCity))}>
            {singleCity.city}
          </Button>
        </Link>
      ))}
      {/* <Link to="/map">
      <button onClick={() => dispatch(city.actions.setCurrentCity("Karlstad"))}>
        Karlstad
      </button>
      </Link>
      <Link to="/map">
      <button onClick={() => dispatch(city.actions.setCurrentCity(city2))}>
        Uppsala
      </button>
      </Link> */}
    </Container>
  );
};
export default Cities;
