import { RouteNames } from "@/types/RouteNames";

/**
 * Get route by name
 * @param name name of route
 */
export default function getRoute(name: RouteNames) {
  let routeUrl = "/";
  routes.map((route) => {
    if (route.name == name) {
      routeUrl = route.path;
      return;
    }
    return "/";
  });

  return routeUrl;
}

const routes = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "login",
    path: "/auth/login",
  },
  {
    name: "register",
    path: "/auth/register",
  },
  {
    name: "forgot-password",
    path: "/auth/forgot-password",
  },
];
