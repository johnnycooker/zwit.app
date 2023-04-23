import React, { useEffect } from "react"
import { NextPageContext } from "next"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import NotesElement from "@/components/notes/notesId"


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

  useEffect(() => {
    const handleRouteChange = () => {
      router.reload()
    };

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    };
  }, [router])

  return (
    <>
      <NotesElement />
    </>
  )
}
  
export default NotesId