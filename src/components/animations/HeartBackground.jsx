// import React, { useEffect } from 'react'
// import './HeartBackground.css'
// const HeartBackground = () => {
//   useEffect(() => {
//     const container = document.querySelector('.heart-background')
    
//     for (let i = 0; i < 25; i++) {
//       const heartWrapper = document.createElement('div')
//       heartWrapper.className = 'heart-wrapper'
//       heartWrapper.style.left = `${Math.random() * 95}%`
//       heartWrapper.style.animationDuration = `${10 + Math.random() * 8}s`
//       heartWrapper.style.animationDelay = `${-Math.random() * 10}s`
      
//       const heart = document.createElement('div')
//       heart.className = 'heart'
      
//       // Create sparkles inside the heart
//       for (let j = 0; j < 3; j++) {
//         const sparkle = document.createElement('div')
//         sparkle.className = 'sparkle'
//         sparkle.style.animationDelay = `${Math.random() * 2}s`
//         sparkle.style.left = `${20 + Math.random() * 60}%`
//         sparkle.style.top = `${20 + Math.random() * 60}%`
//         heart.appendChild(sparkle)
//       }
      
//       heartWrapper.appendChild(heart)
//       container.appendChild(heartWrapper)
//     }
    
//     return () => {
//       container.innerHTML = ''
//     }
//   }, [])

//   return <div className='heart-background'></div>
// }

// export default HeartBackground




// import React, { useEffect } from 'react'
// import './HeartBackground.css' 

// const HeartBackground = () => {
//   useEffect(() => {
//     const container = document.querySelector('.heart-background')
    
//     for (let i = 0; i < 20; i++) {
//       const heartWrapper = document.createElement('div')
//       heartWrapper.className = 'heart-wrapper'
//       heartWrapper.style.left = `${Math.random() * 100}%`
//       heartWrapper.style.animationDuration = `${5 + Math.random() * 5}s`
//       heartWrapper.style.animationDelay = `${Math.random() * 3}s`
//       heartWrapper.style.top = `${-50 - Math.random() * 100}px`
      
//       const heart = document.createElement('div')
//       heart.className = 'heart'
      
//       // Create sparkles inside the heart
//       for (let j = 0; j < 3; j++) {
//         const sparkle = document.createElement('div')
//         sparkle.className = 'sparkle'
//         sparkle.style.animationDelay = `${Math.random() * 2}s`
//         sparkle.style.left = `${20 + Math.random() * 60}%`
//         sparkle.style.top = `${20 + Math.random() * 60}%`
//         heart.appendChild(sparkle)
//       }
      
//       heartWrapper.appendChild(heart)
//       container.appendChild(heartWrapper)
//     }
    
//     return () => {
//       container.innerHTML = ''
//     }
//   }, [])

//   return <div className='heart-background'></div>
// }

// export default HeartBackground

    import React, { useEffect } from 'react'
import './HeartBackground.css' // 👈 CSS file for heart animation

const HeartBackground = () => {
  useEffect(() => {
    const container = document.querySelector('.heart-background')

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div')
      heart.className = 'heart'
      heart.style.left = `${Math.random() * 100}%`
      heart.style.animationDuration = `${5 + Math.random() * 5}s`
      heart.style.animationDelay = `${Math.random() * 3}s`
      container.appendChild(heart)
    }

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return <div className='heart-background'></div>
}

export default HeartBackground
