import Layout from './Layout';
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Poll from "./pages/Poll";
import Dashoard from "./pages/Poll/Dashboard";
import CreatePoll from "./pages/Poll/CreatePoll";
import EditPoll from './pages/Poll/EditPoll';
import DeletePoll from './pages/Poll/DeletePoll';
import MyPolls from "./pages/Poll/MyPolls";
import MyVotes from "./pages/Poll/MyVotes";
import { UserContextProvider } from "./UserContext";
import MyFeeds from './pages/MyFeeds';
import MyProfile from './pages/MyProfile';
import IsAuthenticatedUser from './components/IsAuthenticatedUser';

export { NoPage, Layout, Home, Login, Signup, Poll, Dashoard, CreatePoll, EditPoll, DeletePoll, MyPolls, MyVotes, MyFeeds, MyProfile, UserContextProvider, IsAuthenticatedUser }