import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import NotesElement from "@/components/notes/notesId"
import NotesIdLoadingPage from "@/components/notes/notesIdLoadingPage"

const NotesId = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/auth');
        return;
      }
      setLoading(false);
    };

    fetchData();
  }, [router])

  return (
    <>
      {loading ? <NotesIdLoadingPage /> : <NotesElement />}
    </>
  )
}
  
export default NotesId