// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Dashboard from '~/pages/Dashboard';
import Watch from '~/pages/Watch';
import Trending from '~/pages/Trending';
import Album from '~/pages/Album';
import DBWatch from '~/pages/DBWatch';

import See from '~/pages/See/See';
//Layout
import WatchLayout from '~/layouts/WatchLayout/WatchLayout';
// import DBWatchLayout from '~/layouts/DBWatchLayout/DBWatchLayout';


// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/trending/:type', component: Trending },
    { path: '/watch/:songid', component: Watch, layout: WatchLayout },
];

const privateRoutes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/album', component: Album },
    { path: '/dashboard/:trending', component: Trending },
    { path: '/dashboard/:watch', component: DBWatch },
    { path: '/dashboard/:see', component: See },
];

export { publicRoutes, privateRoutes };