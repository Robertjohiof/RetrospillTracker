"use client";

import { useState, useActionState } from "react"
import SubmitButton from "@features/auth/components/SubmitButton";
import { login } from "@features/auth/authActions"
import {navigate} from "rwsdk/client";
import {useFormStatus} from "react-dom";
import Button from "@/app/shared/components/ui/Button";

export default function Login(props: any){
    const { pending } = useFormStatus()
    const [state, formAction] = useActionState(
        async (prevState:any, formData: FormData) => {
            const response = await login(prevState, formData);
            console.log(response);

            if (response.success) {
                navigate("/profile")
            }
            return response;
        },
        {
            success: false,
            error: "",
            state: {
                user: null,
                session: null
            }
        }
    )

  return (
    <div className="h-1/2 w-90 bg-primary-light fixed md:w-120 md:px-10 top-1/2 left-1/2 p-2 m-auto -translate-1/2 rounded-lg border-4 border-iceblue">
        <div className="flex flex-col gap-4">
            <h2 className="text-white font-bold text-4xl text-shadow-2xs mb-3">Login</h2>
            {!state.success && state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                    <p className="text-sm">{state.error}</p>
                </div>
            )}
            <form className="flex flex-col gap-7" action={formAction}>
                <label htmlFor="userName" className="text-2xl text-white">
                    Username:
                    <input
                        id="userName"
                        name="userName"
                        className="border text-black bg-white w-full p-1 mb-1"
                        type="text"
                        required
                        autoComplete="username"
                        placeholder="Ola Nordmann..."
                    />
                </label>
                <label htmlFor="password" className="text-2xl text-white">
                    Password:
                    <input
                        id="password"
                        name="password"
                        className="bg-white border w-full p-1 text-black"
                        type="password"
                        required
                        autoComplete="current-password"
                        placeholder="**********"
                    />
                </label>
                <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    className="w-full rounded-md text-xl"
                    disabled={pending}
                >
                    {pending ? "Logging in...": "Logg inn"}
                </Button>
            </form>
            <div>
                <p>
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>

            <button className="text-glow-orange border px-4 py-2.5 mx-auto mt-5 bg-white" onClick={props.toggle}>X</button>
        </div>
    </div>
  )
}