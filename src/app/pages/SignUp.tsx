"use client";

import { use, useState } from "react";

export default function SignUp(){
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("")
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    passWord: ""
  })

  function handleSignup(e: any) {
    e.preventDefault();
    setUser(
      {
      firstName: firstname,
      lastName: lastname,
      userName: username,
      passWord: password
    })
  }

  console.log(user)

  return (
    <>
    <h1 className="text-3xl font-bold text-white text-center drop-shadown-sm">Sign up</h1>
    <section className="flex justify-center">
      <div className="w-1/2 bg-iceblue rounded-sm border-secondary p-20">
        <div className="flex flex-col gap-2">
            <h2 className="text-primary font-bold text-lg">Signup</h2>
            <form className="flex flex-col gap-1" onSubmit={handleSignup}>
                <label>
                    First name:
                    <input className="border bg-white w-full p-1 mb-1" type="text" placeholder="Ola..." value={firstname} onChange={e => setFirstname(e.target.value)} />
                </label>
                <label>
                    Last name:
                    <input className="border bg-white w-full p-1 mb-1" type="text" placeholder="Nordmann..." value={lastname} onChange={e => setLastname(e.target.value)} />
                </label>
                <label>
                    Username:
                    <input className="border bg-white w-full p-1 mb-1" type="text" placeholder="Ola Nordmann..." value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input className="bg-white border w-full p-1" type="password" placeholder="**********" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button className="border text-glow-orange mx-30 mt-15 py-2 px-1 bg-primary" type="submit">Sign up</button>
            </form>
        </div>
      </div>
    </section>
    </>
  )
}