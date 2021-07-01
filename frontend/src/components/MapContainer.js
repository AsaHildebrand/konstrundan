import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from "styled-components/macro"
import { Map, Marker } from "pigeon-maps"

import { MAP_URL } from "../reusable/urls"

import artwork from "../reducers/artwork"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`

const InnerContainer = styled.div`
  height: 60%;
  width: 90%;
  margin: 100px 0 0;

  @media (min-width: 1024px) {
    height: 75%;
  }
`

const MapContainer = () => {
  const [locations, setLocations] = useState([])
  const currentCity = useSelector((store) => store.city.currentCity)
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push("/login")
    }
  })

  useEffect(() => {
    if (!currentCity) {
      history.push("/")
    }
    if (currentCity && accessToken) {
      const options={
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }
      fetch(MAP_URL(currentCity.city), options)
        .then((res) => res.json())
        .then((data) => {
          if(data.success) {
            setLocations(data.artWorks)
          } else {
            alert(data.message)
          }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markerColor = "brown"

  const DivMarker = ({ left, top, style, children }) => (
    <div style={{
      position: 'absolute',
      left: left,
      top: top,
      ...(style || {})
    }}>{children}</div>
  )



  return (
    currentCity && (
      <Container>
        <InnerContainer>
          <Map defaultCenter={currentCity.center} defaultZoom={currentCity.zoom}>
            {/* {locations.map((item) => {
              return (
                <Marker
                  key={item.title}
                  width={50}
                  anchor={[item.location.lat, item.location.lng]}
                  color={markerColor}
                  onClick={() => {
                    dispatch(artwork.actions.setArtworkId(item._id))
                    history.push("/artwork")
                  }
                  }
                />
              )
            })} */}
            {locations.map((item) => {
              return (
                // <CustomMarker
                //   key={item.title}
                //   anchor={[item.location.lat, item.location.lng]}
                //   offset={[20, 40]}
                //   color={markerColor}
                //   onClick={() => {
                //     dispatch(artwork.actions.setArtworkId(item._id))
                //     history.push("/artwork")
                //   }
                //   }
                //   style={{
                //     width: 40,
                //     height: 40,
                //     backgroundImage: 'url(./assets/markerwhite.png)',
                //     display: 'flex',
                //     flexDirection: 'row',
                //     justifyContent: 'center',
                //     alignItems: 'center',
                //     // transform: 'rotate(45deg)'
                //     // borderBottomLeftRadius: '100%',
                //     // borderBottomRightRadius: '100%'
                    
                //   }}>
                //     {item.id}
                //   </CustomMarker>
                <DivMarker
                  key={item.title}
                  anchor={[item.location.lat, item.location.lng]}
                  offset={[20, 40]}
                  color={markerColor}
                  onClick={() => {
                    dispatch(artwork.actions.setArtworkId(item._id))
                    history.push("/artwork")
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundImage: 'url(./assets/markerwhite.png)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {item.id}
                  </DivMarker> 
              )
            })}
          </Map>
        </InnerContainer>
      </Container>
    )
  )
}

export default MapContainer
