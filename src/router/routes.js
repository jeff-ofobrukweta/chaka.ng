import { clearSession, requireAuth, noAuthOnly } from "../services/auth";

const Home = () => import(/* webpackChunkName: "home" */ "../views/Home");
const VerificationSent = () =>
    import(/* webpackChunkName: "verification-sent" */ "../views/VerificationSent");
const ForgotPassword = () =>
    import(/* webpackChunkName: "forgot-password" */ "../views/auth/ForgotPassword");
const ResetPassword = () =>
    import(/* webpackChunkName: "reset-password" */ "../views/auth/ResetPassword");
const ConfirmEmail = () =>
    import(/* webpackChunkName: "confirm-email" */ "../views/auth/ConfirmEmail");
const Login = () => import(/* webpackChunkName: "login" */ "../views/auth/Login");
const Policies = () => import(/* webpackChunkName: "policies" */ "../views/Policies");
const Developers = () => import(/* webpackChunkName: "developers" */ "../views/Developers");
const Privacy = () => import(/* webpackChunkName: "privacy" */ "../views/Privacy");
const Calculator = () => import(/* webpackChunkName: "calculator" */ "../views/Calculator");
const Terms = () => import(/* webpackChunkName: "terms" */ "../views/Terms");
const About = () => import(/* webpackChunkName: "about" */ "../views/About");
const Faq = () => import(/* webpackChunkName: "faq" */ "../views/Faq");
const Valentine = () => import(/* webpackChunkName: "valentine" */ "../views/Valentine");
const Gifts = () => import(/* webpackChunkName: "gifts" */ "../views/Gifts");
const Logout = () => import(/* webpackChunkName: "logout" */ "../views/auth/Logout");
const Register = () => import(/* webpackChunkName: "register" */ "../views/auth/Register");
const Disclosures = () => import(/* webpackChunkName: "disclosures" */ "../views/Disclosure");
const AppHome = () => import(/* webpackChunkName: "app-home" */ "../views/AppHome");
const DashboardLayout = () =>
    import(/* webpackChunkName: "dashboard" */ "../layouts/DashboardLayout");
const Portfolio = () => import(/* webpackChunkName: "portfolio" */ "../views/dashboard/Portfolio");
const PortfolioDetails = () =>
    import(/* webpackChunkName: "portfolio-details" */ "../views/dashboard/PortfolioDetails");
const Explore = () => import(/* webpackChunkName: "explore" */ "../views/dashboard/Explore");
const ExploreCollection = () =>
    import(/* webpackChunkName: "explore-collection" */ "../views/dashboard/SingleCollection");
const Categories = () =>
    import(/* webpackChunkName: "categories" */ "../views/dashboard/Categories");
const DashboardCalculator = () =>
    import(/* webpackChunkName: "dashboard-calculator" */ "../views/dashboard/Calculator");
const DashboardGifts = () =>
    import(/* webpackChunkName: "dashboard-gifts" */ "../views/dashboard/Gifts");
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
        component: Home,
        beforeEnter: noAuthOnly
    },
    {
        path: "/relationship-calculator",
        name: "valentine",
        component: Valentine
    },
    {
        path: "/get-the-app",
        name: "apphome",
        component: AppHome
    },
    {
        path: "/about",
        name: "about",
        component: About,
        beforeEnter: noAuthOnly
    },
    {
        path: "/calculator",
        name: "calculator",
        component: Calculator,
        beforeEnter: noAuthOnly
    },
    {
        path: "/gifts",
        name: "gifts",
        component: Gifts,
        beforeEnter: noAuthOnly
    },
    {
        path: "/auth/reset-password/:chakaID/:token",
        name: "reset-password",
        component: ResetPassword
    },
    {
        path: "/auth/confirm-email-token/:chakaID/:token",
        name: "confirm-email",
        component: ConfirmEmail
    },
    {
        path: "/policies",
        name: "policies",
        component: Policies,
        beforeEnter: noAuthOnly
    },
    {
        path: "/developers",
        name: "developers",
        component: Developers,
        beforeEnter: noAuthOnly
    },
    {
        path: "/privacy",
        name: "privacy",
        component: Privacy
    },
    {
        path: "/faq",
        name: "faq",
        component: Faq,
        beforeEnter: noAuthOnly
    },
    {
        path: "/terms",
        name: "terms",
        component: Terms,
        beforeEnter: noAuthOnly
    },
    {
        path: "/verification-sent",
        name: "verification-sent",
        component: VerificationSent,
        beforeEnter: noAuthOnly
    },
    {
        path: "/disclosures",
        name: "disclosures",
        component: Disclosures,
        beforeEnter: noAuthOnly
    },
    {
        path: "/forgot-password",
        name: "forgot-password",
        component: ForgotPassword,
        beforeEnter: noAuthOnly
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        beforeEnter: noAuthOnly
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
        component: Register,
        beforeEnter: noAuthOnly
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
                path: "calculator",
                name: "dashboard-calculator",
                component: DashboardCalculator
            },
            {
                path: "gifts",
                name: "dashboard-gifts",
                component: DashboardGifts
            },
            {
                path: "categories/:category",
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
                        path: "ownerships",
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
