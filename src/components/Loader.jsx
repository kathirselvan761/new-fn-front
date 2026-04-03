import React, { useState } from 'react'
import './loading.css'

const Loading = () => {
  const [showText, setShowText] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [openDoors, setOpenDoors] = useState(false)
  const [blowHeart, setBlowHeart] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (clicked) return
    setClicked(true)
    setOpenDoors(true)

    setTimeout(() => {
      setBlowHeart(true)
      setShowText(true)
    }, 1000)

    setTimeout(() => {
      setFadeOut(true)
    }, 4000)
  }

  return (
    <div
      className={`loading-container ${fadeOut ? 'fade-out' : ''}`}
      onClick={handleClick}
    >
      <div className='bg-stars'></div>
      <div className={`doors ${openDoors ? 'open' : ''}`}>
        <div className='door left'></div>
        <div className='door right'></div>
      </div>
      <div className={`heart-pulse ${blowHeart ? 'blow' : ''}`}></div>
      {showText && <h2 className='loading-text'>Bringing Awesomeness </h2>}
      {!clicked && (
        <p className='click-message'>Click anywhere to unlock </p>
      )}
    </div>
  )
}

export default Loading
