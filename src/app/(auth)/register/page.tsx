"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { AlertIcon } from "@/components/shared/icons";
import { Spinner } from "@/components/shared/Spinner";
import { useToast } from "@/components/shared/ToastProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch, ApiClientError } from "@/lib/apiClient";
import { useAuthStore } from "@/store/useAuthStore";
import type { User } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<{ accessToken: string; refreshToken: string; user: User }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setAuth(data.user, data.accessToken, data.refreshToken);
      showToast(`Welcome to FieldIn, ${data.user.name.split(" ")[0]}!`, "success");
      router.push("/venues");
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Join FieldIn" subtitle="Create your athlete profile in under a minute.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" required minLength={2} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mt-1.5 text-[11px] text-text-primary/50">At least 8 characters.</p>
        </div>
        {error && (
          <p className="flex items-center gap-2 rounded-2xl bg-danger/10 px-3 py-2 text-sm text-danger">
            <AlertIcon className="h-4 w-4 shrink-0" /> {error}
          </p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading && <Spinner />}
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-text-primary/60">
        Already playing?{" "}
        <Link href="/login" className="font-semibold text-emerald">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
