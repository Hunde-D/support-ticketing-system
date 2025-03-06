"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { PasswordInput } from "./ui/password-input";
import { signupSchema } from "@/lib/types";
import { useAuth } from "@/context/auth-context";

function SignupForm() {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "user",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await signup(values);
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

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
                    disabled={isLoading}
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>User Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                    className="flex flex-wrap gap-2"
                  >
                    {[
                      { value: "user", label: "User" },
                      { value: "admin", label: "Admin" },
                    ].map((item) => (
                      <div
                        key={item.value}
                        className="border-input data-[state=checked]:border-primary relative flex flex-col items-start gap-4 rounded-md border p-3 shadow-xs outline-none"
                        data-state={
                          field.value === item.value ? "checked" : "unchecked"
                        }
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            id={`role-${item.value}`}
                            value={item.value}
                            className="after:absolute after:inset-0"
                          />
                          <Label htmlFor={`role-${item.value}`}>
                            {item.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90"
            disabled={isLoading}
            aria-live="polite"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}

export default SignupForm;
