export const PATHS = {
  LOGIN: "/login",
  DASHBOARD: "/",
  NEWS: "/news",
  UPSERT_NEWS: (id: "add" | string) => "/news/" + id,
  CATEGORIES: "/categories",
  TAGS: "/tags",
  ADMINS: "/admins",
};
