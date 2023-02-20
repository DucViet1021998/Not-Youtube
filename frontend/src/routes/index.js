// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Dashboard from '~/pages/Dashboard';


//Layout
import { DashboardLayout } from '~/layouts/DashboardHomeLayout';



// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },

];

const privateRoutes = [{ path: '/dashboard', component: Dashboard, layout: DashboardLayout },];

export { publicRoutes, privateRoutes };