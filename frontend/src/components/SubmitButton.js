import React from 'react'
import styled from "styled-components/macro"

const Button = styled.button`
background-color: #4B3D2D; 
border: 1px solid #4B3D2D;
color: #f1dbb3;
padding: 5px 5px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 14px;
font-weight: 700;
margin:0 0 20px 20px;
align-self: flex-start;
`

const SubmitButton = ({setAnswerIsSubmitted}) => {

  return (
    <Button type="submit" >
    Skicka
    </Button>
  )
}
export default SubmitButton