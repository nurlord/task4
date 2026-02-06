import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "../services/auth.service";
import { toast } from "@/components/ui/toast";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error && error.message ? error.message : fallback;

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Signed in successfully.");
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(getErrorMessage(error, "Login failed."));
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success("Account created. Please sign in.");
      navigate({ to: "/login" });
    },
    onError: (error) => {
      console.error("Register failed:", error);
      toast.error(getErrorMessage(error, "Registration failed."));
    },
  });
};
