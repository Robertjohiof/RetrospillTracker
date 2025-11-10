"use client";

import { useState } from "react";

export default function SignUp(){
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleLogin(e: any) {
    e.preventDefault();
  }
  return (
    <>
    <h1 className="text-3xl font-bold text-white text-center drop-shadown-sm">Sign up</h1>
    <section className="flex justify-center">
      <div className="w-1/2 bg-iceblue rounded-sm border-secondary p-20">
        <div className="flex flex-col gap-2">
            <h2 className="text-primary font-bold text-lg">Signup</h2>
            <form className="flex flex-col gap-1" onSubmit={handleLogin}>
                <label>
                    First name:
                    <input className="border bg-white w-full p-1 mb-1" type="text" placeholder="Ola..." value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Last name:
                    <input className="border bg-white w-full p-1 mb-1" type="text" placeholder="Nordmann..." value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Username:
                    <input className="border bg-white w-full p-1 mb-1" type="text" placeholder="Ola Nordmann..." value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input className="bg-white border w-full p-1" type="password" placeholder="**********" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button className="border text-glow-orange mx-30 py-2 px-1 bg-primary" type="submit">Login</button>
            </form>
            <button className="text-glow-orange border px-2 mx-auto bg-white" onClick={handleLogin}>X</button>
        </div>
      </div>
    </section>
    </>
  )
}