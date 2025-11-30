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
    <div className="h-1/2 w-90 bg-primary-light fixed md:w-120 md:px-10 top-1/2 left-1/2 p-2 m-auto -translate-1/2 rounded-lg border-4 border-iceblue">
        <div className="flex flex-col gap-4">
            <h2 className="text-white font-bold text-4xl text-shadow-2xs mb-3">Login</h2>
            <form className="flex flex-col gap-7" onSubmit={handleLogin}>
                <label className="text-2xl text-white">
                    Username:
                    <input className="border text-black bg-white w-full p-1 mb-1" type="text" placeholder="Ola Nordmann..." value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label className="text-2xl text-white">
                    Password:
                    <input className="bg-white border w-full p-1 text-black" type="password" placeholder="**********" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button className="border text-glow-orange py-2 px-1 bg-primary text-2xl" type="submit">Login</button>
            </form>
            <button className="text-glow-orange border px-4 py-2.5 mx-auto mt-5 bg-white" onClick={props.toggle}>X</button>
        </div>
    </div>
  )
}