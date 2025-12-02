"use client";

import { useActionState } from "react";
import SubmitButton from "@features/auth/components/SubmitButton";
import { login } from "@features/auth/authActions";
import { navigate } from "rwsdk/client";
import { useFormStatus } from "react-dom";
import Button from "@/app/shared/components/ui/Button";

export default function Login(props: any) {
  const { pending } = useFormStatus();
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const response = await login(prevState, formData);
      console.log(response);

      if (response.success) {
        navigate("/profile");
      }
      return response;
    },
    {
      success: false,
      error: "",
      state: {
        user: null,
        session: null,
      },
    }
  );

  return (
    <>
      <h1 className="mt-10 text-center text-4xl font-bold text-white drop-shadow-lg">
        Login
      </h1>

      <section className="flex justify-center px-4 py-10">
        <div
          className="
            w-full max-w-xl
            overflow-hidden
            rounded-3xl
            border border-pink-500/30
            bg-gradient-to-b from-[#0a0015]/90 via-[#0a0015]/70 to-[#210018]/80
            shadow-lg shadow-pink-500/25
            p-6 md:p-8
          "
        >
          <div className="flex flex-col gap-4 text-base md:text-lg">
            <h2 className="text-2xl font-bold text-glow-orange">
              Welcome back
            </h2>

            {/* Error message */}
            {!state.success && state.error && (
              <div className="rounded-md bg-red-500/20 border border-red-500/50 p-3 text-red-200">
                <p className="text-sm">{state.error}</p>
              </div>
            )}

            <form className="flex flex-col gap-4" action={formAction}>
              {/* Username */}
              <label
                htmlFor="userName"
                className="flex flex-col gap-1 text-white"
              >
                <span>Username:</span>
                <input
                  id="userName"
                  name="userName"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2 text-white shadow-sm outline-none focus:ring-2 focus:ring-glow-orange"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Ola Nordmann..."
                />
              </label>

              {/* Password */}
              <label
                htmlFor="password"
                className="flex flex-col gap-1 text-white"
              >
                <span>Password:</span>
                <input
                  id="password"
                  name="password"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2 text-white shadow-sm outline-none focus:ring-2 focus:ring-glow-orange"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="**********"
                />
              </label>

              {/* Submit button */}
              <div className="mt-4 flex justify-center">
                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  className="w-full rounded-md text-xl"
                  disabled={pending}
                >
                  {pending ? "Logging in..." : "Logg inn"}
                </Button>
              </div>
            </form>

            {/* Link to register */}
            <p className="mt-2 text-sm text-white/80">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-glow-orange underline hover:text-pink-300"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
