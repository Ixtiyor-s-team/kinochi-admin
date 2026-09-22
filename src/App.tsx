import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { PATHS } from "./lib/paths";
import LoadingPage from "./pages/loading/page";
import { routes } from "./lib/routes";
import AdminLayout from "./components/layouts/AdminLayout";
import PublicRoute from "./components/layouts/PublicRoute";

const LoginPage = lazy(() => import("./pages/login/page"));
const AccessDeniedPage = lazy(() => import("./pages/access-denied/page"));

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        <Route
          path={PATHS.LOGIN}
          component={() => (
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          )}
        />
        <Route
          path={PATHS.LOGIN}
          component={() => (
            <PublicRoute>
              <AccessDeniedPage />
            </PublicRoute>
          )}
        />
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              component={() => (
                <AdminLayout>
                  <route.component />
                </AdminLayout>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

export default App;
