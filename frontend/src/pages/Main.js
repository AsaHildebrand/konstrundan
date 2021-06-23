import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import MapContainer from '../components/MapContainer'
import SelectedArtwork from './SelectedArtwork'
import { MAP_URL, ANSWER_URL } from "../reusable/urls";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin:0;
  `

const Main = () => {
  const [newAnswer, setNewAnswer] = useState('')
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false)
  const [answerIsSubmitted, setAnswerIsSubmitted] = useState(false)
  const [locations, setLocations] = useState([]);
  const resolvedKarlstad = useSelector((store) => store.user.resolvedKarlstad)
  const resolvedUppsala = useSelector((store) => store.user.resolvedUppsala)
  const artworkId = useSelector((store) => store.artwork.artworkId)
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken)
  const selectedArtwork = useSelector((store) => store.artwork.selectedArtwork);
  const currentCity = useSelector((store) => store.city.currentCity.city);
  console.log(currentCity)

  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  })

  useEffect(() => {
    if (!currentCity) {
      history.push("/");
    }
    if (currentCity) {
      fetch(MAP_URL(currentCity))
        .then((res) => res.json())
        .then((json) => {
          setLocations(json)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(locations);

  const checkResolved = (locationsArray) => {
    const newLocations = [...locationsArray]
    const idsResolvedUppsala = resolvedUppsala.map((item) =>
      item.artwork._id)
    const idsResolvedKarlstad = resolvedKarlstad.map((item) =>
      item.artwork._id)
    for (let item of newLocations) {
      if ((idsResolvedUppsala.includes(item._id)) || (idsResolvedKarlstad.includes(item._id))) {
        item.isResolved = true;
      }
    }
    console.log(newLocations)
    setLocations(newLocations)
  }
  //checkResolved(locations);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setAnswerIsSubmitted(true);
    if (newAnswer.toLowerCase() === selectedArtwork.correctAnswer.toLowerCase()) {
      setAnswerIsCorrect(true)
      const options = {
        method: 'POST',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ artworkId, userId })
      };
      fetch(ANSWER_URL(currentCity), options)
        .then(res => res.json())
        .then(data => {
          checkResolved(locations)
          if (data.success === true) {
            console.log(data)
          } else {
            console.log("Det gick åt skogen")
          }
        })
      console.log(artworkId)
      console.log(userId)
    } else {
      console.log("Fel Svar!")
      setAnswerIsCorrect(false)
    }
  }

  const onNewAnswerChange = (event) => {
    setNewAnswer(event.target.value)
  }




  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route path="/map">
            {artworkId && <SelectedArtwork onNewanswerChange={onNewAnswerChange} onFormSubmit={onFormSubmit} newAnswer={newAnswer} answerIsCorrect={answerIsCorrect} answerIsSubmitted={answerIsSubmitted} />}
            {!artworkId && <MapContainer checkResolved={checkResolved} locations={locations} setLocations={setLocations} />}
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}
export default Main
