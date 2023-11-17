import { Routes, Route } from 'react-router-dom';
import { Layout, Home, NoPage, Login, Signup, Poll, Dashoard, CreatePoll, MyPolls, MyVotes, UserContextProvider, } from './modules'
import './App.css'
function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
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
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
