import { lazy } from 'react';
export default function lazyLoad(path, namedExport) {
    return lazy(() => {
        const promise = import(/* @vite-ignore */ `${path}`)
        if (namedExport == null) {
            return promise
        } else {
            return promise.then(module => ({
                default: module[namedExport]
            }))
        }
    })
}

import { UserContextProvider } from "./contexts/UserContext";
const Layout = lazyLoad('./Layout');
const Home = lazyLoad("./pages/Home");
const NoPage = lazyLoad("./pages/NoPage");
const Login = lazyLoad("./pages/Login");
const Signup = lazyLoad("./pages/Signup");
const VerifyEmail = lazyLoad("./pages/VerifyEmail");
const ForgotPassword = lazyLoad("./pages/ForgotPassword");
const ResetPassword = lazyLoad("./pages/ResetPassword");
const PollLayout = lazyLoad("./pages/Poll");
const Poll = lazyLoad("./pages/Poll/Poll.jsx");
const Dashoard = lazyLoad("./pages/Poll/Dashboard");
const CreatePoll = lazyLoad("./pages/Poll/CreatePoll");
const EditPoll = lazyLoad('./pages/Poll/EditPoll');
const DeletePoll = lazyLoad('./pages/Poll/DeletePoll');
const MyPolls = lazyLoad("./pages/Poll/MyPolls");
const MyVotes = lazyLoad("./pages/Poll/MyVotes");
const SavedPoll = lazyLoad("./pages/Poll/SavedPolls");
const MyFeeds = lazyLoad('./pages/MyFeeds');
const MyProfile = lazyLoad('./pages/MyProfile')
const IsAuthenticatedUser = lazyLoad('./components/IsAuthenticatedUser');
const Profile = lazyLoad('./pages/Profile')

export { NoPage, Layout, Home, Login, Signup, VerifyEmail, ForgotPassword, ResetPassword, PollLayout, Poll, Dashoard, CreatePoll, EditPoll, DeletePoll, MyPolls, MyVotes, SavedPoll, MyFeeds, MyProfile, Profile, UserContextProvider, IsAuthenticatedUser }