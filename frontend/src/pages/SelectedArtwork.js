import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from 'react-router-dom'
import styled from "styled-components/macro";

import BackButton from "../components/BackButton";
import SubmitButton from "../components/SubmitButton";

import { ARTWORK_URL, ANSWER_URL } from "../reusable/urls";
import artwork from "../reducers/artwork";
import user from "../reducers/user";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 75px 0 0 0;
  margin: 0;
  font-family: 'Lora', serif;
`;

const InnerContainer = styled.div`
  background-color: #f1dbb3;
  margin: 20px;
  padding: 20px;

  @media (min-width: 1024px) {
    margin: 50px 130px 50px 130px;
    padding: 40px;
  }
`

const ArtistContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  font-weight: 700;
  margin: 0;
`;
const TextClue = styled.p`
 font-style: italic; 
`;
const Info = styled.p`
  
`;
const Header = styled.h2`
  font-weight: 700px;
`;
const Input = styled.input`
  width: 40px;
  height: 20px;
  background-color: #f1dbb3;
  border: 1px solid #4b3d2d
`;

const Span = styled.span`
  font-weight: 700;
`

const SelectedArtworks = () => {
  const [newAnswer, setNewAnswer] = useState('')
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false)
  const [answerIsSubmitted, setAnswerIsSubmitted] = useState(false)
  const artworkId = useSelector((store) => store.artwork.artworkId);
  const selectedArtwork = useSelector((store) => store.artwork.selectedArtwork);
  const userId = useSelector((store) => store.user.userId);
  const currentCity = useSelector((store) => store.city.currentCity.city);
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  })

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken
      }
    }

    fetch(ARTWORK_URL(currentCity, artworkId), options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(artwork.actions.setSelectedArtwork(data));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setAnswerIsSubmitted(true);
    console.log(selectedArtwork.correctAnswer)
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
      .then(data =>{
        if (data.success === true && currentCity === "Karlstad") {
          batch(() => {
            dispatch(user.actions.setResolvedKarlstad(data.artwork))
            dispatch(user.actions.setResolvedKarlstad(data.user))
            dispatch(user.actions.setErrors(null))
            console.log(data.artwork)
          })
          localStorage.setItem("user", JSON.stringify({
            username: data.username,
            accessToken: data.accessToken,
            userId: data.userId,
            resolvedKarlstad: data.artwork
          }))
        } else if (data.success === true && currentCity === "Uppsala") {
          batch(() => {
            dispatch(user.actions.setResolvedUppsala(data.artwork))
            dispatch(user.actions.setResolvedUppsala(data.user))
            dispatch(user.actions.setErrors(null))
            console.log(data.artwork)
          })
          localStorage.setItem("user", JSON.stringify({
            username: data.username,
            accessToken: data.accessToken,
            userId: data.userId,
            resolvedUppsala: data.artwork
          }))
        }
        else {
          console.log("Det gick åt skogen")
        }
      } )
      console.log(artworkId)
      console.log(userId)
      
    } else { 
      console.log("Fel Svar!")
      setAnswerIsCorrect(false)}
  }

  const onNewAnswerChange = (event) => {
    setNewAnswer(event.target.value)
  }

  console.log(newAnswer)
  

  return (
    selectedArtwork && (
      <Container>
        <BackButton />
        <InnerContainer>
          <Header>{selectedArtwork.title}</Header>
          <ArtistContainer>
            <Text>Av {selectedArtwork.artist}, {selectedArtwork.year}</Text>
          </ArtistContainer>
          <Info>
            {selectedArtwork.description}
          </Info>
          <TextClue><Span>Ledtråd:</Span> {selectedArtwork.clue}</TextClue>
          <form 
          onSubmit={onFormSubmit}
          >
            <label>
              {" "}
              Bokstav:
              {" "}
              <Input 
              type="text"
              value={newAnswer}
              onChange={onNewAnswerChange}
              maxLength = "1"
              />
            </label>
            <SubmitButton />
          </form>

          {answerIsCorrect && 
          <p>Rätt svar! Nu kan du ta nästa konstverk.</p>}
          {!answerIsCorrect && answerIsSubmitted &&
          <p>Fel! Försök igen!</p>}
      </InnerContainer>
      </Container>
    )
  );
};
export default SelectedArtworks;
