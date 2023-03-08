// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Dashboard from '~/pages/Dashboard';
import Watch from '~/pages/Watch';
import Trending from '~/pages/Trending';
import Album from '~/pages/Album';
import DBWatch from '~/pages/DBWatch';
import DBTrending from '~/pages/DBTrending';
import Search from '~/pages/Search';
import AddSong from '~/pages/AddSong'


// import See from '~/pages/See/See';
//Layout
import WatchLayout from '~/layouts/WatchLayout/WatchLayout';
import DBWatchLayout from '~/layouts/DBWatchLayout/DBWatchLayout';


// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/trending/:type', component: Trending },
    { path: '/watch/:songid', component: Watch, layout: WatchLayout },
    { path: '/search/:searchtext', component: Search },
    { path: '/add-song', component: AddSong },
];

const privateRoutes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/album', component: Album },
    { path: '/dashboard/trending/:type', component: DBTrending },
    { path: '/dashboard/watch/:songid', component: DBWatch, layout: DBWatchLayout },
];

export { publicRoutes, privateRoutes };