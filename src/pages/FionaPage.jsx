import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const backgrounds = [
  'https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3', // Paris
  'https://images.unsplash.com/photo-1508213797669-14a0f443815f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3', // Catskills
  'https://images.unsplash.com/photo-1572205244747-03f33afe7e8a?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3', // Brooklyn
]

const PageContainer = styled.div`
  padding: 0;
  margin: 0;
  font-family: sans-serif;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`

const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease-in-out;
  z-index: -1;
`

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BackButton = styled(Link)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const Instructions = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 16px;
  border: 2px solid var(--primary-blue);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #333;
  z-index: 1000;
  max-width: 280px;
  box-shadow: 0 8px 24px rgba(135, 206, 235, 0.3);
  
  @media (max-width: 768px) {
    top: 80px;
    right: 10px;
    left: 10px;
    max-width: none;
    font-size: 16px;
  }
  
  h3 {
    margin: 0 0 12px 0;
    color: var(--primary-blue);
    font-size: 18px;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
  
  p {
    margin: 8px 0;
    line-height: 1.5;
    
    @media (max-width: 768px) {
      margin: 12px 0;
      line-height: 1.6;
    }
  }
  
  strong {
    color: var(--accent-blue);
  }
`

const FionaPage = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const stateRef = useRef({}).current

  useEffect(() => {
    // Define all functions and variables from the original JS
    const elements = {
      body: document.querySelector('.wrapper'),
      wrapper: document.querySelector('.wrapper'),
      dog: document.querySelector('.dog'),
      marker: document.querySelectorAll('.marker'),
    }
    
    if (!elements.body || !elements.dog) return

    // Helper functions to safely get child elements
    const getChild = (el, i) => el.children[Math.floor((i - 1) / 2)]
    const getInnerChild = (el) => el?.children[0]

    const animationFrames = {
      rotate: [[0], [1], [2], [3], [5], [3, 'f'], [2, 'f'], [1, 'f']]
    }

    const directionConversions = {
      360: 'up', 45: 'upright', 90: 'right', 135: 'downright',
      180: 'down', 225: 'downleft', 270: 'left', 315: 'upleft',
    }

    const angles = [360, 45, 90, 135, 180, 225, 270, 315]
    const defaultEnd = 4
    const partPositions = [
      { leg1: { x: 26, y: 43 }, leg2: { x: 54, y: 43 }, leg3: { x: 26, y: 75 }, leg4: { x: 54, y: 75 }, tail: { x: 40, y: 70, z: 1 } }, 
      { leg1: { x: 33, y: 56 }, leg2: { x: 55, y: 56 }, leg3: { x: 12, y: 72 }, leg4: { x: 32, y: 74 }, tail: { x: 20, y: 64, z: 1 } }, 
      { leg1: { x: 59, y: 62 }, leg2: { x: 44, y: 60 }, leg3: { x: 25, y: 64 }, leg4: { x: 11, y: 61 }, tail: { x: 4, y: 44, z: 1 } }, 
      { leg1: { x: 39, y: 63 }, leg2: { x: 60, y: 56 }, leg3: { x: 12, y: 52 }, leg4: { x: 28, y: 50 }, tail: { x: 7, y: 21, z: 0 } }, 
      { leg1: { x: 23, y: 54 }, leg2: { x: 56, y: 54 }, leg3: { x: 24, y: 25 }, leg4: { x: 54, y: 25 }, tail: { x: 38, y: 2, z: 0 } }, 
      { leg1: { x: 21, y: 58 }, leg2: { x: 41, y: 64 }, leg3: { x: 53, y: 50 }, leg4: { x: 69, y: 53 }, tail: { x: 72, y: 22, z: 0 } }, 
      { leg1: { x: 22, y: 59 }, leg2: { x: 30, y: 64 }, leg3: { x: 56, y: 60 }, leg4: { x: 68, y: 62 }, tail: { x: 78, y: 40, z: 0 } }, 
      { leg1: { x: 47, y: 45 }, leg2: { x: 24, y: 53 }, leg3: { x: 68, y: 68 }, leg4: { x: 47, y: 73 }, tail: { x: 65, y: 65, z: 1 } }, 
    ]

    const control = { x: null, y: null, angle: null }
    const distance = 30
    const px = num => `${num}px`
    const radToDeg = rad => Math.round(rad * (180 / Math.PI))
    const overlap = (a, b) => Math.abs(a - b) < 20

    const setStyles = ({ target, x, y }) => {
      if (!target) return
      target.style.transform = `translate(${x || 0}, ${y || 0})`
    }

    const targetAngle = dog => {
      if (!dog) return
      const angle = radToDeg(Math.atan2(dog.pos.y - control.y, dog.pos.x - control.x)) - 90
      const adjustedAngle = angle < 0 ? angle + 360 : angle
      const nearestN = (x, n) => x === 0 ? 0 : (x - 1) + Math.abs(((x - 1) % n) - n)
      return nearestN(adjustedAngle, 45)
    }

    const reachedTheGoalYeah = (x, y) => overlap(control.x, x) && overlap(control.y, y)

    const positionLegs = (dog, frame) => {
      [5, 7, 9, 11].forEach((n, i) => {
        const { x, y } = partPositions[frame][`leg${i + 1}`]
        setStyles({ target: getChild(dog, n), x: px(x), y: px(y) })
      })
    }

    const moveLegs = dog => {
      [5, 11].forEach(i => getInnerChild(getChild(dog, i))?.classList.add('walk-1'))
      [7, 9].forEach(i => getInnerChild(getChild(dog, i))?.classList.add('walk-2'))
    }

    const stopLegs = dog => {
      [5, 11].forEach(i => getInnerChild(getChild(dog, i))?.classList.remove('walk-1'))
      [7, 9].forEach(i => getInnerChild(getChild(dog, i))?.classList.remove('walk-2'))
    }

    const positionTail = (dog, frame) => { 
      const tailWrapper = getChild(dog, 13)
      if (!tailWrapper) return
      setStyles({ target: tailWrapper, x: px(partPositions[frame].tail.x), y: px(partPositions[frame].tail.y) })
      tailWrapper.style.zIndex = partPositions[frame].tail.z
      const tail = getInnerChild(tailWrapper)
      if (tail) tail.classList.add('wag')
    }

    const animateDog = ({ target, frameW, currentFrame, end, data, part, speed, direction }) => {
      if (!target) return
      const offset = direction === 'clockwise' ? 1 : -1
      target.style.transform = `translateX(${px(data.animation[currentFrame][0] * -frameW)})`
      if (part === 'body') {
        positionLegs(data.dog, currentFrame)
        moveLegs(data.dog)
        positionTail(data.dog, currentFrame) 
      } else {
        target.parentNode?.classList.add('happy')
      }
      data.angle = angles[currentFrame]
      data.index = currentFrame
      target.parentNode?.classList[data.animation[currentFrame][1] === 'f' ? 'add' : 'remove']('flip')

      let nextFrame = currentFrame + offset
      nextFrame = nextFrame === -1 ? data.animation.length - 1 : nextFrame === data.animation.length ? 0 : nextFrame

      if (currentFrame !== end) {
        data.timer[part] = setTimeout(() => animateDog({ target, data, part, frameW, currentFrame: nextFrame, end, direction, speed }), speed || 150)
      } else if (part === 'body') {
        control.angle = angles[end]
        data.walk = true
        setTimeout(() => stopLegs(data.dog), 200)
        setTimeout(() => { document.querySelector('.happy')?.classList.remove('happy') }, 5000)
      }
    }
    
    const triggerDogAnimation = ({ target, frameW, start, end, data, speed, part, direction }) => {
      clearTimeout(data.timer[part])
      data.timer[part] = setTimeout(() => animateDog({ target, data, part, frameW, currentFrame: start, end, direction, speed }), speed || 150)
    }
    
    const getDirection = ({ pos, facing, target }) => {
      const dx2 = facing.x - pos.x
      const dy1 = pos.y - target.y
      const dx1 = target.x - pos.x
      const dy2 = pos.y - facing.y
      return dx2 * dy1 > dx1 * dy2 ? 'anti-clockwise' : 'clockwise'
    }

    const turnDog = ({ dog, start, end, direction }) => {
      triggerDogAnimation({ target: getInnerChild(getChild(dog.dog, 3)), frameW: 31 * 2, start, end, data: dog, speed: 100, direction, part: 'head' })
      setTimeout(() => { triggerDogAnimation({ target: getInnerChild(getChild(dog.dog, 1)), frameW: 48 * 2, start, end, data: dog, speed: 100, direction, part: 'body' }) }, 200)
    }

    const createDog = () => {
      const { dog } = elements
      if (!dog) return
      const { width, height, left, top } = dog.getBoundingClientRect()
      dog.style.left = px(left)
      dog.style.top = px(top)
      positionLegs(dog, 0)
      const index = 0
      const dogData = {
        timer: { head: null, body: null, all: null },
        pos: { x: left + (width / 2), y: top + (height / 2) },
        actualPos: { x: left, y: top },
        facing: { x: left + (width / 2), y: top + (height / 2) + 30 },
        animation: animationFrames.rotate, angle: 360, index, dog,
      }
      stateRef.dogData = dogData
      turnDog({ dog: dogData, start: index, end: defaultEnd, direction: 'clockwise' })
      positionTail(dog, 0)
    }

    const checkBoundaryAndUpdateDogPos = (x, y, dog, dogData) => {
      if (!elements.body || !dog || !dogData) return
      const lowerLimit = -40, upperLimit = 40
      if (x > lowerLimit && x < (elements.body.clientWidth - upperLimit)) {
        dogData.pos.x = x + 48
        dogData.actualPos.x = x
      }
      if (y > lowerLimit && y < (elements.body.clientHeight - upperLimit)) {
        dogData.pos.y = y + 48
        dogData.actualPos.y = y
      }
      dog.style.left = px(x)
      dog.style.top = px(y)
    }

    const moveDog = () => {
      if (!stateRef.dogData || !stateRef.dogData.dog) return
      clearInterval(stateRef.dogData.timer.all)
      const { dog } = stateRef.dogData

      stateRef.dogData.timer.all = setInterval(() => {
        if (!dog) {
          clearInterval(stateRef.dogData.timer.all)
          return
        }
        const { left, top } = dog.getBoundingClientRect()
        const start = angles.indexOf(stateRef.dogData.angle)
        const end = angles.indexOf(targetAngle(stateRef.dogData))

        if (reachedTheGoalYeah(left + 48, top + 48)) {
          clearInterval(stateRef.dogData.timer.all)
          const { x, y } = stateRef.dogData.actualPos
          dog.style.left = px(x)
          dog.style.top = px(y)
          stopLegs(dog)
          turnDog({ dog: stateRef.dogData, start, end: defaultEnd, direction: 'clockwise' })
          return
        }

        let { x, y } = stateRef.dogData.actualPos
        const dir = directionConversions[targetAngle(stateRef.dogData)]
        if (dir !== 'up' && dir !== 'down') x += (dir.includes('left')) ? -distance : distance
        if (dir !== 'left' && dir !== 'right') y += (dir.includes('up')) ? -distance : distance

        const rotateCoord = ({ angle, origin, x, y }) => {
          const degToRad = deg => deg / (180 / Math.PI)
          const a = degToRad(angle)
          const aX = x - origin.x
          const aY = y - origin.y
          return { x: (aX * Math.cos(a)) - (aY * Math.sin(a)) + origin.x, y: (aX * Math.sin(a)) + (aY * Math.cos(a)) + origin.y }
        }
        const { x: x2, y: y2 } = rotateCoord({ angle: stateRef.dogData.angle, origin: stateRef.dogData.pos, x: stateRef.dogData.pos.x, y: stateRef.dogData.pos.y - 100 })
        stateRef.dogData.facing.x = x2
        stateRef.dogData.facing.y = y2
        stateRef.dogData.turning = start === end ? false : stateRef.dogData.turning

        if (!stateRef.dogData.turning && stateRef.dogData.walk) {
          if (start !== end) {
            stateRef.dogData.turning = true
            const direction = getDirection({ pos: stateRef.dogData.pos, facing: stateRef.dogData.facing, target: control })
            turnDog({ dog: stateRef.dogData, start, end, direction })
          } else {
            checkBoundaryAndUpdateDogPos(x, y, dog, stateRef.dogData)
            moveLegs(dog)
          }
        }
      }, 200)
    }

    const triggerTurnDog = () => {
      const dog = stateRef.dogData
      if (!dog) return
      dog.walk = false
      control.angle = null
      const direction = getDirection({ pos: dog.pos, facing: dog.facing, target: control })
      const start = angles.indexOf(dog.angle)
      const end = angles.indexOf(targetAngle(dog))
      turnDog({ dog, start, end, direction })
    }

    const handleMouseMove = e => {
      control.x = e.pageX
      control.y = e.pageY
      triggerTurnDog()
    }

    createDog()
    if (elements.body) {
      elements.body.addEventListener('mousemove', handleMouseMove)
      elements.body.addEventListener('click', moveDog)
    }
    
    // Background image cycler
    const bgInterval = setInterval(() => {
      setBackgroundIndex(prev => (prev + 1) % backgrounds.length)
    }, 8000)

    // Cleanup function
    return () => {
      if (elements.body) {
        elements.body.removeEventListener('mousemove', handleMouseMove)
        elements.body.removeEventListener('click', moveDog)
      }
      if (stateRef.dogData && stateRef.dogData.timer) {
        Object.values(stateRef.dogData.timer).forEach(clearTimeout)
        if (stateRef.dogData.timer.all) {
          clearInterval(stateRef.dogData.timer.all)
        }
      }
      clearInterval(bgInterval)
    }
  }, [])

  const getLocationText = () => {
    switch(backgroundIndex) {
      case 0:
        return 'Exploring beautiful Paris! 🏛️'
      case 1:
        return 'Adventures in the Catskills! 🏔️'
      case 2:
        return 'Playing in Brooklyn! 🌳'
      default:
        return 'Fiona\'s Adventure! 🐕'
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .leg-wrapper { 
          position: absolute; 
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAAXNSR0IArs4c6QAAAElJREFUKFNjZICC/////4exQTQjIyMjmAYR6JIwhSBFjLMiLP6nLj+OrBnOnh1pyTBSFIA8jS0sQGGQtuIEJDhhipBDCyQJ4gMALug8VaRjkWwAAAAASUVORK5CYII=); 
          width: 16px; 
          height: 24px; 
          background-size: 16px 24px !important; 
          transition: 0.15s; 
        }
        .leg { width: 100%; height: 100%; }
        .body { 
          position: absolute; 
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAAwCAYAAACxIqevAAAAAXNSR0IArs4c6QAABSpJREFUeF7tm32a1CAMxqe30pvoAfRQegC9id5qfPBZlGELJOQL2nf/2t0pkPySvA20czzwAwIgAAJBBI6gdbEsCIAACDwgQEgCEACBMAIQoDD0WBgEQAAChBwAARB4fPv04UnF8PXnbzXdUJuIajyuAwEQWINAKTpffvwiG/X988d/10rFCAJExo4LQeA6BJL4cESn5XkSI4kIQYCuk1PwBARIBLTEJy8mESEIEClkuAgErkFAW3ykIgQBukZewQsQIBGAAJEw4SIQAAFtAlbiI+mC0AFpRxnzgcCiBCBAiwYGZvkRGL1vInmi4ufFnitBgPaMG6xWIJCFZ/ToN79jAiFSgF5N8Xw+yS8bzq5+HAdrV8W6eNYojLsvAarw1IQ0X3a7L+1XzyFAyIRbEdBq+VBFdPHIxYsS7jvwRBefxefxPDaQJvR6+Vv12r0f4f9fPgDAZGIQyYhItqKFxqUIECFBuTps+nJ/l/9b+xXfVcrTEiJvwtmI0DQjBn94pU/kEikQyNl1XQ1nGVOMtOqza6VSKzP/Odcq/+3a+aGkzmzFOFEhFFduv9t2t2CncIwt2h+DmfIuxtJCiQJqk+1nFceN4JapM5EYyQ6P8HqcpxEpIvKXCbwLQR4i2n0tolk1Pvt66wDswmryeXbVPbuX2vPmjT9bUMPr6mdXp0eMkYScpq1yrEjk+8qjslCqYZRjJAtbaxtLzsgi0JuU6waJ/d9jYj+EHeA3rnHjnnYgqprcrRjVk156Q2BLcAvF/AZeGsngRoiaEP8tIXIMj9FRajJvF5KykBm13p2Zme5BvOOCSeOtyFAniBw4PeKyuveMxsR3VBpPJPifUniRu+ue/OYK3AXAuwJQI781rYh2h1JEduSbxN7hv3zKx2N+HwFkADkFRuGeErKeFhc2qG139tu7SJeQz5pDKQxydmUzhWReHWViys3druVfIcgSektvGbysiGKaXqf0lmzW3YLfMsvjYBEgHpnmzMmeA2AgrH5FpZM5HjZOn0C0Et36oJxSu7XjVwkrvtxCRBlQxqXcbqYHDPPaBwHWhg838UxdjQd+2J2p+5pP+YfPUCSa+aNv9fvtt11gN/jHAVIpvYvokUliJ2eXJDUj2gRldofKqJgqN4b+a8mHjsqClDv2nFdjqNtvbOTVoKtuJWd3kC0RcC6hvXOh1Mmk3mDzhqlfedXNAkQUs22Pe74f2Lq3AWRXjjaLBSJpmYxExAgRhnIErC5O8qRtybdN+Fpa9vdH0naGSW2tcvx+2xNASmnzBvzzrVmiTlu4U/aUyOb0jbdxGq3X/P7yRhnRjnn5ntQUyACIMpglTCRAmjjj0eWSJAmgpbAcRyCMQhuAAHTJ/m4XGeWy9O0WIb2T/nK3pQyBMIU2HbwGSMoJHQIkSZ+T/QpFoJiYSlRkZxaCxnYhwmb/bsdrS/iMTPbVqvWGBAHqxt2HuIfNyrJ1W7qRiG7f7vMpm7ZBaBNAnQjMPJicBPgApSlNzjZEm6Lt3UbsdSnJYbtdUgt1fBjwLnmMy0UoBdQmiJuXj3IBeDwQigSxJv/XpA/Dk5kqWfOMVjECBGiKsihKk4HPlvJ3zkuwdbtiCcCniAKXF6CMd+YQF0/aIlMTa9+BAFuArLosiu6nFULqIq46nnvFAHyMJDApQNon5Ck+kbCxNgCAwCuBaQPqCJUny958h245+J4EKAAB9CIgEqDSVuq3JYbC98x0M10FgRQJqArSic7AJBEBgbQJ/AOoMmm0ZeBaqAAAAAElFTknoRK5CYII=); 
          width: 768px; 
          height: 96px; 
          background-size: 768px 96px !important; 
        }
        .dog { 
          position: absolute; 
          width: 96px; 
          height: 96px; 
          animation: fade-in forwards 1s; 
          transition: 0.5s; 
        }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .head { 
          position: absolute; 
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAAgCAYAAACl82LUAAAAAXNSR0IArs4c6QAAA+hJREFUeF7tmtuV1DAMhyddQSdQABS1FACdQFezx4cVR2h1+X1LnJXnaSbjRLfPkhz7eOzP9kACDxwJbNwmbg88bgP6y5dPz++//txG383WWh64BTgF8m8/fz9+fP382LCvBdBdtNmgN0Rqteqymj4NLp1+CwR6rSNrx3tWUjanMVdn9dWqy2r69BJbyw46PgRdOrL8towpbcVox3N5pX0pnwK7/F6u0Wdke0PyqXWydJghuzzT8rdm/0i7e4FtuX8ma1Wgk3M9IwjCEZlXZnMpl8viuhH0FHiCpQYEDjivJlKO9ImU3Rrwcl/kbz7hKQHU2Nii2cR7OOiR7TzhIay5oGttg6fAKMdrkGkOtkC3xiIQeLI1+yx/IM6XeqJ2WxOPrh/HESawmcC2PHs2a6pDrJklA21lWBmImqBHWbwmu2r6ebCjstFAjrA78rmlSyTb6m21695Yq2VDe+ezWHsH+uhgczCjjFojuya7IjrUyEZBR9sJS3ZNxaqtYlo7Z12jtRePnwcy/RfBfqbP/wN9luCzQdMWqx50V9pd9JoFemQzB1iDU4Kq/S4yvAngVQOkD69JKnysrGgfHnQKtgwId8qVoEeQR/14BILVwnAAve/y+VpVlvej91wC+uxge1k9q2wkm7eCLquaBBTp0aOMTrpZE4Xs02TPhFxj7V9Gzwrbqna3LkK1iaFl9V7QqZ9vaV2u8PkG/e0cTdQCRP/T+3MvU8nXfl7Ae0H3+tXIltn/b9Ane9jKbCPKqAe6tWt7RcAnuxh6vLcuKQ+oiUfkd2qbUmV0bSPlTNi0Ml8TVIQiHnhvl9rrX2sWl1YLY/Xn5frz+VSPkSBVUfoguodingZ0bwNlFuzRTnGrXCu4vHLwszDRmxIJpda/I9fQxasFujWRNbuQSV/GvAPdm2noQ5Fx1vZ0a9ARmWXMFaCTXNJRA6426PyZ3vGDDfpfry+V0SmjjC7jfBJE5z9mTzTudK7XLLmUBa3daN5yyImIZG+tNUEzemSzthBHr3Hf4uS2zIbRTNijcx/knCgAaPXQxnkTrVeutRNsTa4I0lGge/6qeeNkHYXw3ky5O6MfDbYoq2mBoEw3qrqgOvTKlX17NLnRxShPAlavb7Vm1rt6JLFYfTnSr2u2m6cXizIjgo0GWpbzHvktMiX0PeBZrxORitAjl/fv0QE6RJczxvTaK1uV8luzPTyP3mtsj8PJCXT4CNWlR6aX5RH5I2VrfbSlw0i5iJ2jx1ivKb21BHUgVkXhOt7ugP5oB+/n5fDABj1HnNNbuUFPj0AOB2zQc8Q5vZUb9PQI5HDABj1HnNNbuUFPj0AOB7wCKr30XX1N2MUAAAAASUVORK5CYII=); 
          width: 372px; 
          height: 64px; 
          background-size: 372px 64px !important; 
        }
        .head-wrapper.happy > .head { 
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAAgCAYAAACl82LUAAAAAXNSR0IArs4c6QAABCpJREFUeF7tmtlx3DAMQFddxZ0kBSS/Hlfi8W9cQNJJ0tV6qAl2YAgnRVBSyP2yJYq4HkHwWG7zNz0wgAeWAWycJk4P3C4D+s/vX+4/fv+9jL6TrXN54BLgFMi//vqze//2dJuwnwugq2gzQa+I1Nlml7PpU+HS9E9coEcdGW2vWQnZHNocndXPNrucTZ+9xEbZ8bY3QaeOLP9LxpSyorXjsbxSvpRfgZ3+XZ7Br2V5A/KhdJJ0yJBd+pT8zdnf0u69wNZ8n8laCHRwrmYEQNgi89JsTuViWVg3gB4CD7BEQMCA49mEyqE+obJrA16+s/yNBzwkgIiNNbplfoNBt2zHCc/Dmgo6VzZoCrRyPAcZ52AJdKmtBwJNNmef5A+P86meXrulgQfPl2UxE1gmsDV9Z7PGOkQaWTTQUoalgYgE3cripezK6afB7pXtDWQLuSWfS7pYsqXalnuutZVKNm/t3Iu1Duitg43BtDJqRHYku3p0iMj2gu4tJyTZkRkrOotx5Zz0DNZeOH4ayPDOgr2nzz+BniW4N2jcYlWD7ki7i15ZoFs2Y4A5OCmo3P9FhjYAtNnAU4dHkgpuS2e0/x50CPa6uHt+vb2/vWwOnY4E3YLcqsctEKQSBgOo/U3752Zl+r33m0NAzw62ltV7yF6z/PPrqgaGvYdsK7NyAa8pzWhGw1uQFFBPjW5ldJAnDRSYrTjZmZBzrD0y+pEB7ymbm2p7Ox0Dou3a7NGLlm+tQYd6vqZ06RlvsHs40LOyC+yfa3DSbT8t4LW7LdFFqVX6ZLyfoGd4FfXJ1autnK6BLp3atpJtuc3aarS+b/1eW5esa6l/J+AeuZbfh8zo3EFKT9h6lE048NoptVZ/RxaXUgkj1efl+f1+Z6+ReGZFCr/1DcR8mNJFy2pZsFsnxbVypeDimUNbiHIQagtKbVFZs7UogS5lcM4uT7YvbTagayPN26mnnXQ8XRt0j0xt1wOCGJkuvTJBLm5P1wjRoOM+PQtZz/YiBZnbkfE88+7SRG1uCno2aBBszfFZsOGRLUGaab+0tZk1yHDG1xIL9QW+BOfZpbHA1rYwI3emBwczfIfjY1epbTsTOtRVEWbJZc0DFL/iNQSQdWm5Ng5ryAQu2t0bFvLPglsLnkEtlxgkRRzj+s26NSQj3VXZfWgw0ym3XHBgcCFletZhesgwbCXrmfpvdOoEO8wH/WQOAGm1Z+QXs46FsTxtvLo5vIzVHx9mLprUWwj4CtRiYXhFofSNuJntp+L/C4ho8McI9uG20se3HZB6Bbg4Oz27yPvte4Pc4GJ8DlI68ue2RK0+wRsvHWnSW3tc2WvNbvrW1KbdaQ3mEdL3dBv7WDZ39jeGCCPkach7dygj48AmM4YII+RpyHt3KCPjwCYzhggj5GnIe3coI+PAJjOOADdCQTbGUe9fwAAAAASUVORK5CYII=); 
        }
        .head-wrapper.happy { animation: infinite 0.5s pant; }
        @keyframes pant { 0%, 100% { transform: translateY(-1px); } 50% { transform: translateY(0); } }
        .head-wrapper.flip.happy { animation: infinite 0.5s pant-flip; }
        @keyframes pant-flip { 0%, 100% { transform: translateY(-1px) scale(-1, 1); } 50% { transform: translateY(1px) scale(-1, 1); } }
        .tail { 
          position: absolute; 
          background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAADZJREFUKFNjZICCWREW/2FsEJ224gQjiAYTIMnU5ceR5RlmR1qCFTFik4SpBCmihwKCjiTkTQB1sCqti9mJ/QAAAABJRU5CYII=); 
          width: 16px; 
          height: 16px; 
          background-size: 16px !important; 
        }
        .tail-wrapper { position: absolute; width: 16px; height: 16px; transition: 0.15s; }
        .body-wrapper, .head-wrapper { position: absolute; width: 96px; height: 96px; overflow: hidden; z-index: 1; }
        .walk-1 { animation: infinite 0.4s walking; animation-delay: 0; }
        .walk-2 { animation: infinite 0.4s walking; animation-delay: 0.2s; }
        @keyframes walking { 0%, 100% { transform: translateY(-4px); } 50% { transform: translateY(0); } }
        .wag { animation: infinite 0.5s wag; }
        @keyframes wag { 0%, 100% { transform: translateX(-2px); } 50% { transform: translateX(2px); } }
        .head-wrapper { top: 6px; left: 16px; width: 62px; height: 64px; }
        .flip { transform: scale(-1, 1); }
        .img-bg { image-rendering: pixelated; background-repeat: no-repeat !important; }
        .d-none { display: none; }
        .marker { width: 10px; height: 10px; border-radius: 50%; position: absolute; transition: 0.5s; z-index: 100; margin-top: -5px; margin-left: -5px; }
        .red { background-color: rgb(255, 64, 0); } 
        .green { background-color: rgb(42, 239, 190); } 
        .blue { background-color: rgb(0, 140, 255); }
      `}</style>

      <PageContainer>
        {backgrounds.map((bg, index) => (
          <BackgroundContainer
            key={bg}
            style={{ 
              backgroundImage: `url(${bg})`,
              opacity: index === backgroundIndex ? 1 : 0,
            }}
          />
        ))}

        <BackButton to="/homes">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Properties
        </BackButton>

        <Instructions>
          <h3>🐕 Meet Fiona!</h3>
          <p><strong>{getLocationText()}</strong></p>
          <p><strong>Move your mouse</strong> around to make Fiona look at you and get excited!</p>
          <p><strong>Click anywhere</strong> to make her walk to that spot!</p>
          <p>Watch her realistic animations as she turns, walks, and wags her tail!</p>
        </Instructions>

        <Wrapper>
          <div className="marker red d-none"></div>
          <div className="marker green d-none"></div>
          <div className="marker blue d-none"></div>

          <div className="dog">
            <div className="body-wrapper">
              <div className="body img-bg"></div>
            </div>
            <div className="head-wrapper">
              <div className="head img-bg"></div>
            </div>
            <div className="leg-wrapper">
              <div className="leg one img-bg"></div>
            </div>
            <div className="leg-wrapper">
              <div className="leg two img-bg"></div>
            </div>
            <div className="leg-wrapper">
              <div className="leg three img-bg"></div>
            </div>
            <div className="leg-wrapper">
              <div className="leg four img-bg"></div>
            </div>
            <div className="tail-wrapper">
              <div className="tail img-bg"></div>
            </div>
          </div>
        </Wrapper>
      </PageContainer>
    </>
  )
}

export default FionaPage