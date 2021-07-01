import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from "styled-components/macro"
import { Map, Marker } from "pigeon-maps"

import { MAP_URL, RESOLVED_URL } from "../reusable/urls"

import artwork from "../reducers/artwork"
import user from "../reducers/user"

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
  const [resolvedKarlstad, setResolvedKarlstad] = useState([])
  const currentCity = useSelector((store) => store.city.currentCity)
  const accessToken = useSelector(store => store.user.accessToken)
  const userId = useSelector((store) => store.user.userId)

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
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }
      fetch(MAP_URL(currentCity.city), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setLocations(data.artWorks)
          } else {
            alert(data.message)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (userId && accessToken) {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken
        }
      }
      const currentCity1 = "Karlstad"
      fetch(RESOLVED_URL(currentCity1, userId), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            console.log(data)
            setResolvedKarlstad(data.onlyArtworks)
          } else {
            alert(data.message)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (userId && accessToken) {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: accessToken
  //       }
  //     }
  //     const currentCity2 = "Uppsala"
  //     fetch(RESOLVED_URL(currentCity2, userId), options)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.success === true) {
  //           setResolvedUppsala(data.resolvedArtWorksByUser.artwork)
  //         } else {
  //           alert(data.message)
  //         }
  //       })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])



  let markerColor = "brown"

  const resolvedList = resolvedKarlstad.map((i) => {
    i.artwork
  })

  // determineMarkerColor = () => {
  //   if (ResolvedKarlstad.includes(item._id) || ResolvedUppsala.includes(item._id)) {
  //     return "green"
  //   } else {
  //     return "brown"
  //   }
  // }

  return (
    currentCity && (
      <Container>
        <InnerContainer>
          <Map defaultCenter={currentCity.center} defaultZoom={currentCity.zoom}>
            {locations.map((item) => {
              console.log(resolvedKarlstad)
              // if (resolvedKarlstad.includes(item._id) || resolvedUppsala.includes(item._id)) {

              console.log(resolvedList)
              if (resolvedList.includes(item_id)) {
                markerColor = "green"
              } else {
                markerColor = "brown"
              }
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
            })}
          </Map>
        </InnerContainer>
      </Container>
    )
  )
}

export default MapContainer
