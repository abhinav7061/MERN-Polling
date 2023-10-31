import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home, NoPage, Footer, Navbar } from './modules'
import styles from './styles';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}  overflow-hidden`}>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />

        </div>
      </div>
    </>
  )
}

export default App
