// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Dashboard from '~/pages/Dashboard';
import Watch from '~/pages/Watch';
import Trending from '~/pages/Trending';
import DBWatch from '~/pages/DBWatch';
import DBTrending from '~/pages/DBTrending';
import Search from '~/pages/Search';
import AddSong from '~/pages/AddSong'
import DBSearch from '~/pages/DBSearch'
import DBAddSong from '~/pages/DBAddSong'
import Album from '~/pages/Album';
import Admin from '~/pages/Admin'

// import See from '~/pages/See/See';
//Layout
import WatchLayout from '~/layouts/WatchLayout/WatchLayout';
import DBWatchLayout from '~/layouts/DBWatchLayout/DBWatchLayout';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/trending/:type', component: Trending },
    { path: '/watch/:songId', component: Watch, layout: WatchLayout },
    { path: '/search/:searchText', component: Search },
    { path: '/add-song', component: AddSong },
];

const privateRoutes = [
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/dashboard', component: Dashboard },
    { path: '/album', component: Album },
    { path: '/dashboard/trending/:type', component: DBTrending },
    { path: '/dashboard/watch/:songId', component: DBWatch, layout: DBWatchLayout },
    { path: '/dashboard/search/:searchText', component: DBSearch },
    { path: '/dashboard/add-song', component: DBAddSong },

];

export { publicRoutes, privateRoutes };