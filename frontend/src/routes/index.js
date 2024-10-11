import PublicLayout from "../layouts/public/Layout";
import PrivateLayout from "../layouts/private/Layout";
import privateRoutes from "./types/private";
import publicRoutes from "./types/public";
import { ROUTE_TYPES } from "./routeTypes";

const routesTemplate = [
  {
    routes: publicRoutes,
    template: PublicLayout,
    type: ROUTE_TYPES.public,
  },
  {
    routes: privateRoutes,
    template: PrivateLayout,
    type: ROUTE_TYPES.private,
  }
];

export default routesTemplate;
