const Home = () => import(/* webpackChunkName: "home" */ "../views/Home");
const DashboardLayout = () =>
  import(/* webpackChunkName: "dashboard" */ "../layouts/DashboardLayout");
const Portfolio = () => import(/* webpackChunkName: "portfolio" */ "../views/dashboard/Portfolio");
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

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/portfolio",
        name: "portfolio",
        component: Portfolio
      },
      {
        path: "explore",
        name: "explore",
        component: Portfolio
      },
      {
        path: "categories",
        name: "categories",
        component: Portfolio
      },
      {
        path: "accounts",
        component: AccountsIndex,
        children: [
          {
            path: "",
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
          }
        ]
      }
    ]
  }
];
export default routes;
