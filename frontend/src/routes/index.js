// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Dashboard from '~/pages/Dashboard';
import Watch from '~/pages/Watch';

//Layout
import { DashboardLayout } from '~/layouts/DashboardHomeLayout';
import WatchLayout from '~/layouts/WatchLayout/WatchLayout';


// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/watch/:songid', component: Watch, layout: WatchLayout },

];

const privateRoutes = [{ path: '/dashboard', component: Dashboard, layout: DashboardLayout },];

export { publicRoutes, privateRoutes };