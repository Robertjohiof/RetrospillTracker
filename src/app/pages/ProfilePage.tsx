"use client";

import { ProfileLayout } from "@features/profilePage/layout/ProfileLayout";
import { useProfileData } from "@features/profilePage/hooks/useProfileData";
import { useEffect, useState } from "react";


export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const { data, search, setSearch } = useProfileData(user?.userName)

  useEffect(() => {
    (async () => {
      const u = await getTestUser();
      setUser(u);
    })
  })
  
  
  // const { data, error, loading, search, setSearch } = useProfileData("Sell_Mango");
  // return <ProfileLayout 
  // search={search} 
  // setSearch={setSearch}
  // data={data}
  // error={error}
  // loading={loading}  
  // />;
}
