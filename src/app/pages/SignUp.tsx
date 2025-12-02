"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { FormEvent } from "react";
import type { SignUpPayload } from "@/app/features/signUp/types/signuptypes";
import { register } from "@features/auth/authActions"
import Button from "@/app/shared/components/ui/Button";

export default function SignUp() {
    const { pending } = useFormStatus();
  const SIGNUP_ENDPOINT = "/api/v1/auth/signup"; // OBS:: Denne er ikke satt opp enda.

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSignup(payload: SignUpPayload): Promise<boolean> {
    const formData = new FormData();

    // Tekstfelt
    formData.append("firstName", payload.firstName);
    formData.append("lastName", payload.lastName);
    formData.append("userName", payload.userName);
    formData.append("passWord", payload.passWord);
    formData.append("email", payload.email);
    formData.append("biography", payload.biography);
    formData.append("role", payload.role);

    if (payload.profilePic) {
      formData.append("profilePic", payload.profilePic);
    }

    if (payload.banner) {
      formData.append("banner", payload.banner);
    }

    try {
      const response = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        console.error("Signup failed:", response.status, errorText);
        setGeneralError(
          "Signup failed. Please try again later when the service is available."
        );
        setSuccessMessage(null);
        return false;
      }

      const data = await response.json().catch(() => null);
      console.log("Signup success! Response from backend:", data);

      setSuccessMessage("Account created successfully! 🎉");
      setGeneralError(null);
      return true;
    } catch (error) {
      console.error("Network error during signup:", error);
      setGeneralError(
        "Network error. Please check your connection and try again."
      );
      setSuccessMessage(null);
      return false;
    }
  }

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setGeneralError(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);

    const profilePicEntry = formData.get("profilePic");
    const bannerEntry = formData.get("banner");

    const payload: SignUpPayload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      userName: String(formData.get("userName") ?? ""),
      passWord: String(formData.get("passWord") ?? ""),
      email: String(formData.get("email") ?? ""),
      biography: String(formData.get("biography") ?? ""),
      role: String(formData.get("role") ?? ""),
      profilePic:
        profilePicEntry instanceof File && profilePicEntry.size > 0
          ? profilePicEntry
          : null,
      banner:
        bannerEntry instanceof File && bannerEntry.size > 0
          ? bannerEntry
          : null,
    };

    console.log("Signup payload:", payload);

    setIsSubmitting(true);
    try {
      const ok = await onSignup(payload);
      if (ok) {
        e.currentTarget.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="mt-10 text-center text-4xl font-bold text-white drop-shadow-lg">
        Sign up
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
              Create account
            </h2>

            {/* Success message */}
            {successMessage && (
              <div className="rounded-md bg-green-500/20 border border-green-500/50 p-3 text-green-200">
                {successMessage}
              </div>
            )}

            {/* General error message */}
            {generalError && (
              <div className="rounded-md bg-red-500/20 border border-red-500/50 p-3 text-red-200">
                {generalError}
              </div>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              {/* First name */}
              <label className="flex flex-col gap-1 text-white">
                <span>First name:</span>
                <input
                  name="firstName"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2 text-white shadow-sm outline-none focus:ring-2 focus:ring-glow-orange"
                  type="text"
                  placeholder="Ola..."
                />
              </label>

              {/* Last name */}
              <label className="flex flex-col gap-1 text-white">
                <span>Last name:</span>
                <input
                  name="lastName"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2 text-white shadow-sm outline-none focus:ring-2 focus:ring-glow-orange"
                  type="text"
                  placeholder="Nordmann..."
                />
              </label>

              {/* Username */}
              <label className="flex flex-col gap-1 text-white">
                <span>Username:</span>
                <input
                  name="userName"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2 text-white shadow-sm outline-none focus:ring-2 focus:ring-glow-orange"
                  type="text"
                  placeholder="OlaNordmann..."
                />
              </label>

              {/* Password */}
              <label className="flex flex-col gap-1 text-white">
                <span>Password:</span>
                <input
                  name="passWord"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2 text-white shadow-sm outline-none focus:ring-2 focus:ring-glow-orange"
                  type="password"
                  placeholder="*********"
                />
              </label>

              {/* Email */}
              <label className="flex flex-col gap-1 text-white">
                <span>Email:</span>
                <input
                  name="email"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2 text-white shadow-sm outline-none focus:ring-2 focus:ring-glow-orange"
                  type="email"
                  placeholder="ola@nordmann.no"
                />
              </label>

              {/* Biography */}
              <label className="flex flex-col gap-1 text-white">
                <span>Biography:</span>
                <textarea
                  name="biography"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2 text-white shadow-sm outline-none focus:ring-2 focus:ring-glow-orange"
                  placeholder="Write a short description..."
                  rows={3}
                />
              </label>

              {/* Role */}
              <label className="flex flex-col gap-1 text-white">
                <span>Role:</span>
                <input
                  name="role"
                  className="w-full rounded-md border border-white/20 bg-white/5 p-2 text-white shadow-sm outline-none focus:ring-2 focus:ring-glow-orange"
                  type="text"
                  placeholder="Gamer, collector, admin..."
                />
              </label>

              {/* Profile picture */}
              <label className="flex flex-col gap-1 text-white">
                <span>Profile picture:</span>
                <input
                  name="profilePic"
                  className="
                    w-full rounded-md border border-white/30 bg-white/10 p-2 text-white shadow-sm
                    file:mr-3 file:rounded-md file:border file:border-white/20
                    file:bg-pink-600/80 file:text-white file:px-3 file:py-1 file:text-sm file:font-semibold
                    hover:file:bg-pink-500
                  "
                  type="file"
                  accept="image/*"
                />
              </label>

              {/* Banner image */}
              <label className="flex flex-col gap-1 text-white">
                <span>Banner image:</span>
                <input
                  name="banner"
                  className="
                    w-full rounded-md border border-white/30 bg-white/10 p-2 text-white shadow-sm
                    file:mr-3 file:rounded-md file:border file:border-white/20
                    file:bg-pink-600/80 file:text-white file:px-3 file:py-1 file:text-sm file:font-semibold
                    hover:file:bg-pink-500
                  "
                  type="file"
                  accept="image/*"
                />
              </label>

              {/* Submit button */}
              <div className="mt-4 flex justify-center">
                <Button
                  type="submit"
                  variant="glow"
                  size="lg"
                  className="w-full rounded-md text-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Sign up"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
