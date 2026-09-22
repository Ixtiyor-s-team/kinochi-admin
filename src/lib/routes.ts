import { lazy } from "react";
import { PATHS } from "./paths";
const DashboardPage = lazy(() => import("../pages/dashboard/page"));
const NewsPage = lazy(() => import("../pages/news/page"));
const NotFoundPage = lazy(() => import("../pages/not-found/page"));

export const routes = [
  {
    path: PATHS.DASHBOARD,
    component: DashboardPage,
  },
  {
    path: PATHS.NEWS,
    component: NewsPage,
  },
  {
    component: NotFoundPage,
  },
];
