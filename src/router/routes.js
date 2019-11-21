const Home = () => import(/* webpackChunkName: "home" */ "../views/Home");
const DashboardLayout = () =>
  import(/* webpackChunkName: "dashboard" */ "../layouts/DashboardLayout");
const Portfolio = () => import(/* webpackChunkName: "portfolio" */ "../views/dashboard/Portfolio");

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
        path: "",
        name: "portfolio",
        component: Portfolio
      }
    ]
  }
];
export default routes;
