import React from 'react'
import Intro from './Intro'
import Feature from './Feature'
import Quote from './Quote'
import styles from '../../styles'

const Home = () => {
  return (
    <div className={`${styles.boxWidth}`}>
      <Quote />
      <Feature />
      <Intro />
    </div>
  )
}

export default Home