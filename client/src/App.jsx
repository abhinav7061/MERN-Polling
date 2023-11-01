import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home, NoPage, Footer, Navbar, Login, Signup } from './modules'
import styles from './styles';
import { Toaster } from 'sonner';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}  overflow-hidden`}>
          <Navbar />
          <Toaster position="top-right" richColors closeButton='true' />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />

        </div>
      </div>
    </>
  )
}

export default App
