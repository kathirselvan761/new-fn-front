// FloatingHearts.jsx
import React from 'react'
import { motion } from 'framer-motion'
import './floating.css'

const NUM_HEARTS = 15

const HeartSVG = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 29.6"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.6,0c-3.4,0-6.4,2.1-7.6,5.1C14.8,2.1,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,8.5,16,21.2,16,21.2s16-12.7,16-21.2 C32,3.8,28.2,0,23.6,0z" />
  </svg>
)

const FloatingHearts = () => {
  const hearts = Array.from({ length: NUM_HEARTS }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 30,
    left: Math.random() * 100 + '%',
    delay: Math.random() * 3,
    duration: 6 + Math.random() * 3,
    color: ['#ff4d6d', '#ff5e78', '#ffccd5'][i % 3],
  }))

  return (
    <div className='floating-hearts-container'>
      {hearts.map(({ id, size, left, delay, duration, color }) => (
        <motion.div
          key={id}
          className='floating-heart'
          initial={{ y: 600, opacity: 0 }}
          animate={{ y: -200, opacity: 1 }}
          transition={{
            delay,
            duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
          style={{ left, width: size, height: size }}
        >
          <div className='heart-sway'>
            <HeartSVG size={size} color={color} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingHearts
