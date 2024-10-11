import Home from "../../views/home";
import Login from "../../views/auth/Login";
import Register from "../../views/auth/Register";

const routes = [
    {
      component: Home,
      exact: true,
      path: "/",
    },
    {
      component: Login,
      exact: true,
      path: "/login"
    },
    {
      component: Register,
      exact: true,
      path: "/register"
    }
];

export default routes;