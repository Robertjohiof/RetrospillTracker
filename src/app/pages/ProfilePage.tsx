"use client";

import { ProfileLayout } from "@features/profilePage/layout/ProfileLayout";
import { useProfileData } from "@features/profilePage/hooks/useProfileData";
import { useEffect, useState } from "react";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";



export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const { data, search, setSearch, loading, error } = useProfileData(user?.userName)


  // useEffect(() => {
  //   async function loadUser() {
  //     try {
  //       const [result] = await db
  //       .select()
  //       .from(users)
  //     setUser(result)
  //   } catch (err) {
  //     console.log("Failed fetching")
  //    }
  //   }
  //   loadUser()
  // }, [])

  console.log(user)
  
  if(!user) return <p>Fetching user...</p>

  return (
    <ProfileLayout 
      data={data} 
      search={search} 
      setSearch={setSearch}
      loading={loading}
      error={error}
    />
  )
}
