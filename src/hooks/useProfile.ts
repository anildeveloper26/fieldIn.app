import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";
import { useAuthStore } from "@/store/useAuthStore";
import type { User } from "@/types";

/** Uploads a profile photo to R2 via the backend and swaps it into the session. */
export function useUploadAvatar() {
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (file: File) => {
      const body = new FormData();
      body.append("file", file);
      return apiFetch<User>("/users/avatar", { method: "POST", body });
    },
    onSuccess: (user) => updateUser({ avatarUrl: user.avatarUrl }),
  });
}
