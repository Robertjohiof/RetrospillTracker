"use client";

import { useState } from "react"

export default function Login(props: any){
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleLogin(e: any) {
    e.preventDefault();
    props.toggle()
  }

  return (
    <div className="w-3xs bg-iceblue fixed top-1/2 left-1/2 p-2 m-auto -translate-1/2 rounded-sm border-secondary">
        <div className="flex flex-col gap-2">
            <h2 className="text-primary font-bold text-lg">Login</h2>
            <form className="flex flex-col gap-1" onSubmit={handleLogin}>
                <label>
                    Username:
                    <input className="border bg-white w-full p-1 mb-1" type="text" placeholder="Ola Nordmann..." value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input className="bg-white border w-full p-1" type="password" placeholder="**********" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button className="border text-glow-orange py-2 px-1 bg-primary" type="submit">Login</button>
            </form>
            <button className="text-glow-orange border px-2 mx-auto bg-white" onClick={props.toggle}>X</button>
        </div>
    </div>
  )
}