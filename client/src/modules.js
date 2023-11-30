import { lazy } from 'react';
export default function lazyLoad(path, namedExport) {
    return lazy(() => {
        const promise = import(`${path}`)
        if (namedExport == null) {
            return promise
        } else {
            return promise.then(module => ({
                default: module[namedExport]
            }))
        }
    })
}

import { UserContextProvider } from "./UserContext";
const Layout = lazyLoad('./Layout');
const Home = lazyLoad("./pages/Home");
const NoPage = lazyLoad("./pages/NoPage");
const Login = lazyLoad("./pages/Login");
const Signup = lazyLoad("./pages/Signup");
const Poll = lazyLoad("./pages/Poll");
const Dashoard = lazyLoad("./pages/Poll/Dashboard");
const CreatePoll = lazyLoad("./pages/Poll/CreatePoll");
const EditPoll = lazyLoad('./pages/Poll/EditPoll');
const DeletePoll = lazyLoad('./pages/Poll/DeletePoll');
const MyPolls = lazyLoad("./pages/Poll/MyPolls");
const MyVotes = lazyLoad("./pages/Poll/MyVotes");
const MyFeeds = lazyLoad('./pages/MyFeeds');
const MyProfile = lazyLoad('./pages/MyProfile')
const IsAuthenticatedUser = lazyLoad('./components/IsAuthenticatedUser');

export { NoPage, Layout, Home, Login, Signup, Poll, Dashoard, CreatePoll, EditPoll, DeletePoll, MyPolls, MyVotes, MyFeeds, MyProfile, UserContextProvider, IsAuthenticatedUser }