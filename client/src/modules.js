// export default function lazyLoad(path, namedExport) {
//     return lazy(() => {
//         const promise = import(/* @vite-ignore */ `${path}`)
//         if (namedExport == null) {
//             return promise
//         } else {
//             return promise.then(module => ({
//                 default: module[namedExport]
//             }))
//         }
//     })
// }
import { lazy } from 'react';

import { UserContextProvider } from "./contexts/UserContext";
const Layout = lazy(() => import('./Layout'));
const Home = lazy(() => import("./pages/Home"));
const NoPage = lazy(() => import("./pages/NoPage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const PollLayout = lazy(() => import("./pages/Poll"));
const Poll = lazy(() => import("./pages/Poll/Poll.jsx"));
const Dashoard = lazy(() => import("./pages/Poll/Dashboard"));
const CreatePoll = lazy(() => import("./pages/Poll/CreatePoll"));
const EditPoll = lazy(() => import('./pages/Poll/EditPoll'));
const MyPolls = lazy(() => import("./pages/Poll/MyPolls"));
const MyVotes = lazy(() => import("./pages/Poll/MyVotes"));
const SavedPoll = lazy(() => import("./pages/Poll/SavedPolls"));
const MyFeeds = lazy(() => import('./pages/MyFeeds'));
const MyProfile = lazy(() => import('./pages/MyProfile'));
const IsAuthenticatedUser = lazy(() => import('./components/IsAuthenticatedUser'));
const Profile = lazy(() => import('./pages/Profile'));

export { NoPage, Layout, Home, Login, Signup, VerifyEmail, ForgotPassword, ResetPassword, PollLayout, Poll, Dashoard, CreatePoll, EditPoll, MyPolls, MyVotes, SavedPoll, MyFeeds, MyProfile, Profile, UserContextProvider, IsAuthenticatedUser }