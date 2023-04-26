import React, { useEffect, useState } from "react"
import { getSession } from "next-auth/react"
import NotesPageComponent from "@/components/notes/notes"
import NotesLoadingPage from "@/components/notes/notesLoadingPage";
import { useRouter } from "next/router"





const Notes = () => {

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
      {loading ? <NotesLoadingPage /> : <NotesPageComponent />}
    </>
  )

}
  
export default Notes