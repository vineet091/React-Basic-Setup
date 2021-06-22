import HomePage from "../src/pages/Home/App";
import About from "../src/pages/About/About";
import { renderRoutes } from "react-router-config";

const Root = ({ route }) => (
  <div>
    <h1>Root</h1>
    {renderRoutes(route.routes)}
  </div>
);

const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        name: "home",
        component: HomePage
      },
      {
        path: "/about",
        exact: true,
        name: "about",
        component: About
      }
    ]
  }
];

export default routes;
