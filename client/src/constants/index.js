// here constants can be write which will be use in the components like header navbar etc. 

const footerLinks = [
    {
        id: 1,
        name: 'Terms & Conditions',
        linkTo: "terms",
    },
    {
        id: 2,
        name: 'Privacy Policy',
        linkTo: "policies",
    },
    {
        id: 3,
        name: 'info.polllab.com',
        linkTo: "about",
    },
]

const navLinks = [
    {
        id: 1,
        name: 'Home',
        linkTo: "/",
    },
    {
        id: 2,
        name: 'About',
        linkTo: "/about",
    },
    {
        id: 3,
        name: 'Services',
        linkTo: "/services",
    },
    {
        id: 4,
        name: 'Contact',
        linkTo: "/constact",
    },
    {
        id: 5,
        name: 'Poll',
        linkTo: "/poll",
    },
]

const sideLinks = [
    {
        id: 1,
        icon_name: 'home',
        text: 'My Feed',
        linkTo: "/poll",
    },
    {
        id: 2,
        icon_name: 'apps',
        text: 'Dashoard',
        linkTo: "/poll/dashboard",
    },
    {
        id: 3,
        icon_name: 'bar-chart-outline',
        text: 'Create Poll',
        linkTo: "/poll/create",
    },
    {
        id: 4,
        icon_name: 'bar-chart-outline',
        text: 'My Polls',
        linkTo: "/poll/my-poll",
    },
    {
        id: 5,
        icon_name: 'bar-chart-outline',
        text: 'My votes',
        linkTo: "/poll/my-vote",
    },
]

const pollMessage = {
    'feeds': 'No Feeds Found',
    'votes': 'You have ZERO votes',
    'polls': 'You have ZERO poll'
}

export { footerLinks, navLinks, sideLinks, pollMessage }