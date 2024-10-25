import { Routes, Route } from 'react-router-dom';
import { Layout, Home, NoPage, Login, Signup, VerifyEmail, ForgotPassword, ResetPassword, PollLayout, Poll, Dashoard, CreatePoll, EditPoll, MyPolls, MyVotes, SavedPoll, MyFeeds, MyProfile, Profile, UserContextProvider, IsAuthenticatedUser } from './modules'
// const Poll = lazy(() => import('./pages/Poll'))
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
            <Route path='verify-email' element={<VerifyEmail />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path='poll' element={<IsAuthenticatedUser><PollLayout /></IsAuthenticatedUser>} >
              {/* Routing for internal polls. For the sidebar */}
              <Route
                index
                element={<IsAuthenticatedUser><MyFeeds /></IsAuthenticatedUser>}
              />
              <Route
                path='posts/:pollId'
                element={<IsAuthenticatedUser><Poll /></IsAuthenticatedUser>}
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
                path="my-poll"
                element={<IsAuthenticatedUser><MyPolls /></IsAuthenticatedUser>}
              />
              <Route
                path="my-vote"
                element={<IsAuthenticatedUser><MyVotes /></IsAuthenticatedUser>}
              />
              <Route
                path="saved-polls"
                element={<IsAuthenticatedUser><SavedPoll /></IsAuthenticatedUser>}
              />
              <Route
                path="my_profile"
                element={<IsAuthenticatedUser><MyProfile /></IsAuthenticatedUser>}
              />
              <Route
                path="profile/:id"
                element={<IsAuthenticatedUser><Profile /></IsAuthenticatedUser>}
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
