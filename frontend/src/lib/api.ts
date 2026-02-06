import ky from "ky";
import { router } from "@/router";

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL || "http://localhost:6677",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    beforeError: [
      async (error) => {
        const body = await error.response
          .json<{ error: string }>()
          .catch(() => null);

        if (body && body.error) {
          error.message = body.error;
        }

        return error;
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");

          const currentPath = router.state.location.pathname;

          if (currentPath !== "/login" && currentPath !== "/register") {
            await router.navigate({ to: "/login", replace: true });
          }
        }
      },
    ],
  },
});
