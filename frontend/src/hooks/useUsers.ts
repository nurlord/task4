import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
  queryOptions,
} from "@tanstack/react-query";
import { userService } from "../services/user.service";
import { toast } from "@/components/ui/toast";

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error && error.message ? error.message : fallback;

const formatCountMessage = (count: number, verb: string) =>
  `${count} user${count === 1 ? "" : "s"} ${verb}.`;

export const usersQueryOptions = queryOptions({
  queryKey: ["users"],
  queryFn: userService.getAll,
  retry: false,
  refetchOnWindowFocus: false,
});

export const useUsers = () => {
  return useSuspenseQuery(usersQueryOptions);
};

export const useUserActions = () => {
  const queryClient = useQueryClient();

  const blockMutation = useMutation({
    mutationFn: userService.block,
    onSuccess: (_data, userIds) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(formatCountMessage(userIds.length, "blocked"));
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to block users."));
    },
  });

  const unblockMutation = useMutation({
    mutationFn: userService.unblock,
    onSuccess: (_data, userIds) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(formatCountMessage(userIds.length, "unblocked"));
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to unblock users."));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: userService.delete,
    onSuccess: (_data, userIds) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(formatCountMessage(userIds.length, "deleted"));
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete users."));
    },
  });

  const deleteUnverifiedMutation = useMutation({
    mutationFn: userService.deleteUnverified,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Unverified users deleted.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete unverified users."));
    },
  });

  return {
    block: blockMutation.mutateAsync,
    unblock: unblockMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    deleteUnverified: deleteUnverifiedMutation.mutateAsync,
    isPending:
      blockMutation.isPending ||
      unblockMutation.isPending ||
      deleteMutation.isPending ||
      deleteUnverifiedMutation.isPending,
  };
};
