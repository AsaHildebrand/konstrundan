import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BackButton from './BackButton'

import { ARTWORK_URL } from '../reusable/urls'

import artwork from '../reducers/artwork'

const SelectedArtworks = () => {
  const artworkId = useSelector((store) => store.artwork.artworkId)
  const selectedArtwork = useSelector((store) => store.artwork.selectedArtwork)

  const dispatch = useDispatch()

    useEffect(() => {
      fetch(`https://konstrundan.herokuapp.com/artworks/Karlstad/${artworkId}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(artwork.actions.setSelectedArtwork(data.clue))
         
        })
        
    }, [])

    //ARTWORK_URL(artworkId)


  return (
    <>
    <div>
      <BackButton/>
     <p>{artworkId}</p>
     <p>{selectedArtwork}</p>
     <img src="https://live.staticflickr.com/65535/51237398370_85f766eb1d_b.jpg" alt="Girl in a jacket"/>
      <form>
        <label> Bokstav:
          <input
          type= "text">
          </input>
        </label>
      </form>
    </div>
    </>
  )
}
export default SelectedArtworks