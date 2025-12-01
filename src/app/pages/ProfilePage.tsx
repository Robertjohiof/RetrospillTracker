"use client";

import { ProfileLayout } from "@features/profilePage/layout/ProfileLayout";
import { useProfileData } from "@features/profilePage/hooks/useProfileData";

export default function ProfilePage({ userId }: { userId: string }) { 
  const { data, search, setSearch, loading, error } = useProfileData(userId)

  if (loading) return <p>Hentar brukar</p>;
  if (error) return <p>{error}</p>
  if(!data) return <p>Ikkje ein einaste brukar...</p>

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
