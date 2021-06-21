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
        .then((json) => {
          const changedArtworks = json.forEach(item => {
            item.lat = parseFloat(item.lat)
          });

          const doublechangedArtworks = changedArtworks.forEach(item => {
            item.lng = parseFloat(item.lng)
          }
          )
          setLocations(doublechangedArtworks);
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const test = "59.3820127"
  // const log = parseFloat(test)
  // console.log(log)

  // locations.forEach(item => {
  //   item.lat = parseFloat(item.lat)
  //   item.lng = parseFloat(item.lng))
  // }
  //   return locations;
  //   console.log(locations)

  const testLocations =

    [
      {
        "_id": "60c5edf6a3267815f8efa57f",
        "id": 1,
        "title": "Vargen",
        "artist": "Lennart Sand",
        "year": 1999,
        "location": [59.369761, 13.4867216],
        "clue": "Vilken är den fjärde bokstaven i översta raden på skylten till denna skulptur?",
        "correctAnswer": "G",
        "__v": 0
      },
      {
        "_id": "60c5edf6a3267815f8efa580",
        "id": 2,
        "title": "Dimman",
        "artist": "Gusten Lindberg",
        "year": 1937,
        "location": [59.3766395, 13.4929866],
        "clue": "Vilken är den andra bokstaven i den andra raden på skylten till denna skulptur?",
        "correctAnswer": "U",
        "__v": 0
      },
      {
        "_id": "60c5edf6a3267815f8efa581",
        "id": 3,
        "title": "Flottaren",
        "artist": "Solveig Nyqvist",
        "year": 2001,
        "location": [59.3814502, 13.4872158],
        "clue": "Vilken är den första bokstaven på skyltens tredje rad?",
        "correctAnswer": "I",
        "__v": 0
      }
    ]

  const markerColor = "brown"



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
                  anchor={[item.lat, item.lng]}
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
