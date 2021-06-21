import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Map, Marker } from "pigeon-maps";

import artwork from "../reducers/artwork";
import { MAP_URL } from "../reusable/urls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;

  @media (min-width: 1024px) {
    
  }
`;

const InnerContainer = styled.div`
    height: 75%;
    width: 90%;
`

const MapContainer = () => {
  const [locations, setLocations] = useState([]);
  const currentCity = useSelector((store) => store.city.currentCity);
  console.log(currentCity);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!currentCity) {
      history.push("/cities");
    } else if (currentCity) {

      fetch(MAP_URL(currentCity.city))
        .then((res) => res.json())
        .then((json) => setLocations(json)) 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markerColor = "blue"

  return (
    currentCity && (
      <Container>
        <InnerContainer>
          <Map defaultCenter={currentCity.center} defaultZoom={currentCity.zoom}>
            {locations.map((item) => {
              return (
                <Marker
                  key={item.title}
                  width={50}
                  anchor={[item.location.lat, item.location.lng]}
                  color={markerColor}
                  onClick={() =>
                    dispatch(artwork.actions.setArtworkId(item._id))
                  }
                />
              )
            })}
          </Map>
        </InnerContainer>
      </Container>
    )
  );
};

export default MapContainer;
