import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactAriaRouterProvider
        navigate={(path) => router.navigate({ to: path })}
        useHref={(path) => router.buildLocation({ to: path }).href}
      >
        <RouterProvider router={router} />
      </ReactAriaRouterProvider>
    </QueryClientProvider>
  </StrictMode>,
);
