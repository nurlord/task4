import {
  createRouter,
  createRoute,
  Outlet,
  redirect,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";
import UserTablePage from "@/pages/main/UserTablePage";
import { Toast } from "@/components/ui/toast";
import { usersQueryOptions } from "./hooks/useUsers";
import type { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

interface MyRouterContext {
  queryClient: QueryClient;
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="min-h-screen bg-white text-black">
      <Outlet />
      <Toast />
    </div>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(usersQueryOptions);
  },
  component: UserTablePage,
  beforeLoad: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
]);

export const router = createRouter({
  routeTree,

  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
