const Home = () => import(/* webpackChunkName: "home" */ '../views/Home');
const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../layouts/DashboardLayout');
const Portfolio = () => import(/* webpackChunkName: "portfolio" */ '../views/dashboard/Portfolio');
const PortfolioDetails = () => import(/* webpackChunkName: "portfolio-details" */ '../views/dashboard/PortfolioDetails');
const Explore = () => import(/* webpackChunkName: "portfolio" */ '../views/dashboard/Explore');
const Categories = () => import(/* webpackChunkName: "categories" */ '../views/dashboard/Categories');
const AccountsIndex = () => import(/* webpackChunkName: "accounts-index" */ '../views/dashboard/accounts/Index');
const AccountsOverview = () => import(/* webpackChunkName: "accounts-overview" */ '../views/dashboard/accounts/Overview');
const AccountsWallet = () => import(/* webpackChunkName: "accounts-wallet" */ '../views/dashboard/accounts/Wallet');
const AccountsStatements = () => import(/* webpackChunkName: "accounts-statements" */ '../views/dashboard/accounts/Statements');
const AccountsHistory = () => import(/* webpackChunkName: "accounts-history" */ '../views/dashboard/accounts/History');
const AccountsSettings = () => import(/* webpackChunkName: "accounts-settings" */ '../views/dashboard/accounts/Settings');
const AccountStamps = () => import(/* webpackChunkName: "accounts-stamps" */ '../views/dashboard/accounts/Stamps');

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        redirect: '/dashboard/portfolio',
        children: [
            {
                path: 'portfolio',
                name: 'portfolio',
                component: Portfolio
            },
            {
                path: 'portfolio/details/:type',
                name: 'portfolio-details',
                component: PortfolioDetails
            },
            {
                path: 'explore',
                name: 'explore',
                component: Explore
            },
            {
                path: 'categories',
                name: 'categories',
                component: Categories
            },
            {
                path: 'accounts',
                component: AccountsIndex,
                redirect: '/dashboard/accounts/overview',
                children: [
                    {
                        path: 'overview',
                        name: 'accounts-overview',
                        component: AccountsOverview
                    },
                    {
                        path: 'wallet',
                        name: 'accounts-wallet',
                        component: AccountsWallet
                    },
                    {
                        path: 'statements',
                        name: 'accounts-statements',
                        component: AccountsStatements
                    },
                    {
                        path: 'history',
                        name: 'accounts-history',
                        component: AccountsHistory
                    },
                    {
                        path: 'settings',
                        name: 'accounts-settings',
                        component: AccountsSettings
                    },
                    {
                        path: 'stamps',
                        name: 'accounts-stamps',
                        component: AccountStamps
                    }
                ]
            }
        ]
    }
];
export default routes;
