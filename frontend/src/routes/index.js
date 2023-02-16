

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';


// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };