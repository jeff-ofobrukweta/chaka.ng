import { clearSession, requireAuth } from "../services/auth";

const Home = () => import(/* webpackChunkName: "home" */ "../views/Home");
const VerificationSent = () =>
    import(/* webpackChunkName: "verification-sent" */ "../views/VerificationSent");
const Login = () => import(/* webpackChunkName: "login" */ "../views/auth/Login");
const Logout = () => import(/* webpackChunkName: "logout" */ "../views/auth/Logout");
const Register = () => import(/* webpackChunkName: "register" */ "../views/auth/Register");
const DashboardLayout = () =>
    import(/* webpackChunkName: "dashboard" */ "../layouts/DashboardLayout");
const Portfolio = () => import(/* webpackChunkName: "portfolio" */ "../views/dashboard/Portfolio");
const PortfolioDetails = () =>
    import(/* webpackChunkName: "portfolio-details" */ "../views/dashboard/PortfolioDetails");
const Explore = () => import(/* webpackChunkName: "explore" */ "../views/dashboard/Explore");
const ExploreCollection = () =>
    import(/* webpackChunkName: "explore-collection" */ "../views/dashboard/SingleCollection");
const Components = () =>
    import(/* webpackChunkName: "components" */ "../views/dashboard/Components");
const Categories = () =>
    import(/* webpackChunkName: "categories" */ "../views/dashboard/Categories");
const AccountsIndex = () =>
    import(/* webpackChunkName: "accounts-index" */ "../views/dashboard/accounts/Index");
const AccountsOverview = () =>
    import(/* webpackChunkName: "accounts-overview" */ "../views/dashboard/accounts/Overview");
const AccountsWallet = () =>
    import(/* webpackChunkName: "accounts-wallet" */ "../views/dashboard/accounts/Wallet");
const AccountsStatements = () =>
    import(/* webpackChunkName: "accounts-statements" */ "../views/dashboard/accounts/Statements");
const AccountsHistory = () =>
    import(/* webpackChunkName: "accounts-history" */ "../views/dashboard/accounts/History");
const AccountsSettings = () =>
    import(/* webpackChunkName: "accounts-settings" */ "../views/dashboard/accounts/Settings");
const AccountStamps = () =>
    import(/* webpackChunkName: "accounts-stamps" */ "../views/dashboard/accounts/Stamps");
const Singlestock = () =>
    import(/* webpackChunkName: "accounts-stamps" */ "../views/dashboard/Singlestock");

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/verification-sent",
        name: "verification-sent",
        component: VerificationSent
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/logout",
        name: "logout",
        component: Logout,
        beforeEnter: clearSession
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardLayout,
        redirect: "/dashboard/portfolio",
        beforeEnter: requireAuth,
        children: [
            {
                path: "portfolio",
                name: "portfolio",
                component: Portfolio
            },
            {
                path: "portfolio/details/:type",
                name: "portfolio-details",
                component: PortfolioDetails
            },
            {
                path: "explore",
                name: "explore",
                component: Explore
            },
            {
                path: "collection/:name",
                name: "explore-collection",
                component: ExploreCollection
            },
            {
                path: "components",
                name: "components",
                component: Components
            },
            {
                path: "categories",
                name: "categories",
                component: Categories
            },
            {
                path: "singlestock/:symbol",
                name: "singlestock",
                component: Singlestock
            },
            {
                path: "accounts",
                component: AccountsIndex,
                redirect: "/dashboard/accounts/overview",
                children: [
                    {
                        path: "overview",
                        name: "accounts-overview",
                        component: AccountsOverview
                    },
                    {
                        path: "wallet",
                        name: "accounts-wallet",
                        component: AccountsWallet
                    },
                    {
                        path: "statements",
                        name: "accounts-statements",
                        component: AccountsStatements
                    },
                    {
                        path: "history",
                        name: "accounts-history",
                        component: AccountsHistory
                    },
                    {
                        path: "settings",
                        name: "accounts-settings",
                        component: AccountsSettings
                    },
                    {
                        path: "stamps",
                        name: "accounts-stamps",
                        component: AccountStamps
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        redirect: "/dashboard"
    }
];
export default routes;
