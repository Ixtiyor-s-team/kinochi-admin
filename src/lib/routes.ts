import { lazy } from "react";
import { PATHS } from "./paths";
const DashboardPage = lazy(() => import("../pages/dashboard/page"));
const NewsPage = lazy(() => import("../pages/news/page"));
const TagsPage = lazy(() => import("../pages/tags/page"));
const CategoriesPage = lazy(() => import("../pages/categories/page"));
const AdminsPage = lazy(() => import("../pages/admins/page"));

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
    path: PATHS.TAGS,
    component: TagsPage,
  },
  {
    path: PATHS.CATEGORIES,
    component: CategoriesPage,
  },
  {
    path: PATHS.ADMINS,
    component: AdminsPage,
  },
  {
    component: NotFoundPage,
  },
];
