import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home, NoPage, Footer, Navbar, Login, Signup, Poll, Dashoard, CreatePoll, MyPolls, MyVotes, UserContextProvider } from './modules'
import styles from './styles';
import { Toaster } from 'sonner';
import './App.css'
function App() {
  
  return (
    <>
      <UserContextProvider>
        <div className={`${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}  overflow-hidden`}>
            <Navbar />
            <Toaster position="top-right" richColors closeButton='true' /> {/* this is the position for showing notification */}
            <Routes>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Signup />} />
              <Route path='poll' element={<Poll />} >
                {/* Routing for internal polls. For the sidebar */}
                <Route
                  index
                  element={<Dashoard />}
                />
                <Route
                  path="create"
                  element={<CreatePoll />}
                />
                <Route
                  path="my-poll"
                  element={<MyPolls />}
                />
                <Route
                  path="my-vote"
                  element={<MyVotes />}
                />
              </Route>
              <Route path="*" element={<NoPage />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </UserContextProvider>
    </>
  )
}

export default App
