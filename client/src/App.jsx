import { Routes, Route } from 'react-router-dom';
import { Layout, Home, NoPage, Login, Signup, Poll, Dashoard, CreatePoll, EditPoll, DeletePoll, MyPolls, MyVotes, MyFeeds, MyProfile, UserContextProvider, IsAuthenticatedUser } from './modules'
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
            <Route path="profile" element={<IsAuthenticatedUser><MyProfile /></IsAuthenticatedUser>} />
            <Route path='poll' element={<IsAuthenticatedUser><Poll /></IsAuthenticatedUser>} >
              {/* Routing for internal polls. For the sidebar */}
              <Route
                index
                element={<IsAuthenticatedUser><MyFeeds /></IsAuthenticatedUser>}
              />
              <Route
                path='dashboard'
                element={<IsAuthenticatedUser><Dashoard /></IsAuthenticatedUser>}
              />
              <Route
                path="create"
                element={<IsAuthenticatedUser><CreatePoll /></IsAuthenticatedUser>}
              />
              <Route
                path='edit-poll/:id'
                element={<IsAuthenticatedUser><EditPoll /></IsAuthenticatedUser>}
              />
              <Route
                path='delete-poll/:id'
                element={<IsAuthenticatedUser><DeletePoll /></IsAuthenticatedUser>}
              />
              <Route
                path="my-poll"
                element={<IsAuthenticatedUser><MyPolls /></IsAuthenticatedUser>}
              />
              <Route
                path="my-vote"
                element={<IsAuthenticatedUser><MyVotes /></IsAuthenticatedUser>}
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
