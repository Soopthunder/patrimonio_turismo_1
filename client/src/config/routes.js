import Dashboard from '../containers/Dashboard/Dashboard';
import Destination from '../containers/Destination/Destinations'
import Content from '../containers/Content/Content';
import Messages from '../containers/Messages/Messages';
import Login from '../containers/Login/Login';
import Settings from '../containers/Settings/Settings';
import CreateDestination from '../containers/Destination/CreateDestination';

const routes = {
    privateRoutes:{
        dashboard: {
            path: '/',
            exact: true,
            component: Dashboard
        },
        createDestination: {
            path: '/destinos/crear-destino',
            component: CreateDestination
        },
        destinations: {
            path: '/destinos',
            exact: true,
            component: Destination
        },
        mainContent: {
            path: '/contenido',
            exact: false,
            component: Content
        },
        messages: {
            path: '/mensajes/:id',
            exact: false,
            component: Messages
        },
        settings: {
            path:'/configuracion',
            exact: true,
            component: Settings
        }
    },
    publicRoutes: {
        login: {
            path: '/login',
            exact: false,
            component: Login
        }
    }
}


export default routes;