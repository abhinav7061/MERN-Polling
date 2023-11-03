import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home, NoPage, Footer, Navbar, Login, Signup, Poll } from './modules'
import styles from './styles';
import { Toaster } from 'sonner';
import './App.css'
import Dashoard from './pages/Poll/Dashboard';
import CreatePoll from './pages/Poll/CreatePoll';
import YourPolls from './pages/Poll/YourPolls';
import YourVotes from './pages/Poll/YourVotes';

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
            {/* <Route path='/poll' element={<Poll />} /> */}
            <Route path='/poll' element={<Poll />} >
              <Route
                index
                element={<Dashoard />}
              />
              <Route
                path="/poll/create"
                element={<CreatePoll />}
              />
              <Route
                path="/poll/my-poll"
                element={<YourPolls />}
              />
              <Route
                path="/poll/my-vote"
                element={<YourVotes />}
              />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
