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
        icon_name: 'apps',
        text: 'Dashoard',
        linkTo: "/poll",
    },
    {
        id: 2,
        icon_name: 'bar-chart-outline',
        text: 'Create Poll',
        linkTo: "/poll/create",
    },
    {
        id: 3,
        icon_name: 'bar-chart-outline',
        text: 'Your Polls',
        linkTo: "/poll/yourpoll",
    },
    {
        id: 4,
        icon_name: 'bar-chart-outline',
        text: 'Your votes',
        linkTo: "/poll/yourvote",
    },
]

export { footerLinks, navLinks, sideLinks }