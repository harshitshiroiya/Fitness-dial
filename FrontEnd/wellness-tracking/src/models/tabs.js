export const CustomerTabs = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Messages', route: '/messages' },
    { name: 'Notifications', route: '/notifications' },
    {
        name: 'Account',
        children: [
            { name: 'Profile', route: '/profile' },
            { name: 'My Plan', route: '/plan' },
            { name: 'Logout', route:'/logout' },
            { name: 'Settings', route: '/settings' }
        ]
    }];

export const ProfessionalTabs = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Messages', route: '/messages' },
    { name: 'Notifications', route: '/notifications' },
    {
        name: 'Account',
        children: [
            { name: 'Profile', route: '/profile' },
            { name: 'Logout', route:'/logout'},
            { name: 'Settings', route: '/settings' }
        ]
    }
]


export const routes = [
    '/dashboard','/search','messages','/notifications','/profile', '/plan','/settings'
]