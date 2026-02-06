import { api } from "@/lib/api";
import { type User } from "@/types/user";

export const userService = {
  getAll: () => api.get("users").json<User[]>(),

  block: (userIds: number[]) =>
    api.put("users/block", { json: { userIds } }).json(),

  unblock: (userIds: number[]) =>
    api.put("users/unblock", { json: { userIds } }).json(),

  delete: (userIds: number[]) =>
    api.delete("users/delete", { json: { userIds } }).json(),

  deleteUnverified: () => api.delete("users/delete-unverified").json(),
};
