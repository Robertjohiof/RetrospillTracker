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
    <div className="w-3xs bg-primary-light absolute top-100 right-100 p-2">
        <div className="flex-row">
            <h2 className="text-white">Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input className="border bg-white" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input className="bg-white border" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
            </form>
            <button onClick={props.toggle}>Close</button>
        </div>
    </div>
  )
}