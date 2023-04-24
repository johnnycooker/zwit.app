import React, { useEffect, useState } from "react"
import { NextPageContext } from "next"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import NotesElement from "@/components/notes/notesId"
import NotesLoadingPage from "@/components/notes/notesLoadingPage"

const LoadingPage = () => {
  return (
    <>
      <NotesLoadingPage />
    </>
    
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
      return {
          redirect: {
              destination: '/auth',
              permanent: false,
          }
      }
  }

  return {
      props: {}
  }
}

const NotesId = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 800)
    };

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    };
  }, [router])

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && <NotesElement />}
    </>
  )
}
  
export default NotesId