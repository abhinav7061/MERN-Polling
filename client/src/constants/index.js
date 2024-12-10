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
const getSideLinks = (userRole) => {
    const sideLinks = [
        {
            id: 1,
            icon_name: userRole === 'admin' ? 'rocket' : 'home',
            text: 'My Feed',
            linkTo: userRole === 'admin' ? `/poll/myfeeds` : `/poll`,
        },
        {
            id: 2,
            icon_name: 'speedometer',
            text: 'Dashboard',
            linkTo: "/poll/dashboard",
        },
        {
            id: 3,
            icon_name: 'create',
            text: 'Create Poll',
            linkTo: "/poll/create",
        },
        {
            id: 4,
            icon_name: 'stats-chart',
            text: 'My Polls',
            linkTo: "/poll/my-poll",
        },
        {
            id: 5,
            icon_name: 'thumbs-up',
            text: 'My Votes',
            linkTo: "/poll/my-vote",
        },
        {
            id: 6,
            icon_name: 'bookmarks',
            text: 'Saved Polls',
            linkTo: "/poll/saved-polls",
        },
    ];

    if (userRole === 'admin') {
        sideLinks.unshift({
            id: 7,
            icon_name: 'home',
            text: 'All Polls',
            linkTo: `/poll`,
        });
        sideLinks.splice(2, 0, {
            id: 8,
            icon_name: 'people',
            text: 'All Users',
            linkTo: `/poll/all-users`,
        })
    }

    return sideLinks;
};


const pollMessage = {
    'feeds': 'No Feeds Found',
    'votes': 'You have ZERO votes',
    'polls': 'You have ZERO poll'
}

export { footerLinks, navLinks, getSideLinks, pollMessage }