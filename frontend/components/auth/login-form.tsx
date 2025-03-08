"use client";

import { useTransition, useCallback } from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { Input } from "../ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import { PasswordInput } from "../ui/password-input";
import { Loader2 } from "lucide-react";
import { login } from "@/actions/auth-action";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/lib/query-client/get-query-client";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = getQueryClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof loginSchema>) => {
      startTransition(async () => {
        try {
          const result = await login(values.email, values.password);
          if (result.success) {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            router.push("/");
            await queryClient.refetchQueries({ stale: true });
            toast.success("Login successful!");
          } else {
            toast.error("Invalid email or password");
          }
        } catch (error) {
          console.error("Login submission error:", error);
          toast.error("Something went wrong. Please try again.");
        }
      });
    },
    [queryClient, router]
  );

  return (
    <CardContent className="pt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="m@example.com"
                    type="email"
                    autoComplete="email"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    autoComplete="current-password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};
