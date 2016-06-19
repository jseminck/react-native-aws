const routes = {};

/**
 * Homepage
 *
 */
routes.getAwsRoute = () => ({
    getSceneClass() {
        return require('../components/Aws/TabsScreen').default;
    },
    getTitle() {
        return 'Github';
    }
});

routes.getLoginRoute = () => ({
    getSceneClass() {
        return require('../components/Login/LoginScreen').default;
    },
    getTitle() {
        return 'Login';
    }
});

export default routes;
