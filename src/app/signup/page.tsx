"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signupSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { signUpWithEmail } from "@/lib/supabase/auth";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "FOUNDER" as "FOUNDER" | "INVESTOR",
    },
  });

  const onSubmit = async (formdata: {
    name: string;
    email: string;
    password: string;
    role: "FOUNDER" | "INVESTOR";
  }) => {
    try {
      const { data, error: authError } = await signUpWithEmail(
        formdata.name,
        formdata.email,
        formdata.password,
        formdata.role
      );

      if (authError) {
        setError(authError.message);
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] bg-gradient-to-br from-[#111827] via-[#1e293b] to-[#111827] px-4 py-8">
      <div className="w-full max-w-md p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg border border-blue-100 transition-all">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="mt-2 text-gray-600">
            Join AngelMatch as a founder or investor
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border-l-4 border-red-500 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-gray-700">I am a...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="FOUNDER"
                            className="text-blue-500 border-gray-300 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-gray-700">
                          Founder
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="INVESTOR"
                            className="text-blue-500 border-gray-300 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-gray-700">
                          Investor
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors py-2 h-11 mt-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-500 hover:text-blue-600 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
