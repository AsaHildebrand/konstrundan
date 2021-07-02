import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import BackButton from '../components/BackButton'
import SubmitButton from '../components/SubmitButton'
import { ARTWORK_URL, ANSWER_URL } from '../reusable/urls'

import artwork from '../reducers/artwork'

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
`

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
`

const Text = styled.p`
  font-weight: 700;
  margin: 0;
`

const TextClue = styled.p`
  font-style: italic; 
`

const Info = styled.p`
  
`

const Header = styled.h2`
  font-weight: 700px;
  margin:0;
`

const Input = styled.input`
  width: 40px;
  height: 20px;
  background-color: #f1dbb3;
  border: 1px solid #4b3d2d
`

const Span = styled.span`
  font-weight: 700;
`

const Form = styled.form`
height: 30px;
`


const SelectedArtwork = () => {
  const [newAnswer, setNewAnswer] = useState('')
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false)
  const [answerIsSubmitted, setAnswerIsSubmitted] = useState(false)
  const artworkId = useSelector((store) => store.artwork.artworkId)
  const selectedArtwork = useSelector((store) => store.artwork.selectedArtwork)
  const userId = useSelector((store) => store.user.userId)
  const currentCity = useSelector((store) => store.city.currentCity.city)
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/login')
    }
  })

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken
        }
      }
      fetch(ARTWORK_URL(currentCity, artworkId), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(artwork.actions.setSelectedArtwork(data.selectedArtwork))
          } else {
            alert(data.message)
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault()
    setAnswerIsSubmitted(true)
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
          if (data.success === true) {
            alert(data.message)
          } else {
            alert(data.message)
          }
        })
    } else {
      setAnswerIsCorrect(false)
    }
  }

  const onNewAnswerChange = (event) => {
    setNewAnswer(event.target.value)
  }

  return (
    selectedArtwork && (
      <Container>
        <InnerContainer>
          <Header><span>{selectedArtwork.id}. </span>{selectedArtwork.title}</Header>
          <ArtistContainer>
            <Text>Av {selectedArtwork.artist}, {selectedArtwork.year}</Text>
          </ArtistContainer>
          <Info>
            {selectedArtwork.description}
          </Info>
          <TextClue><Span>Ledtråd:</Span> {selectedArtwork.clue}</TextClue>
          <Form
            onSubmit={onFormSubmit}
          >
            <label>
              {' '}
              Bokstav:
              {' '}
              <Input
                type='text'
                value={newAnswer}
                onChange={onNewAnswerChange}
                maxLength='1'
              />
            </label>
            <SubmitButton />
          </Form>
          {answerIsCorrect &&
            <p>Rätt svar! Nu kan du ta nästa konstverk.</p>}
          {!answerIsCorrect && answerIsSubmitted &&
            <p>Fel! Försök igen!</p>}
        </InnerContainer>
        <BackButton />
      </Container>
    )
  )
}
export default SelectedArtwork
