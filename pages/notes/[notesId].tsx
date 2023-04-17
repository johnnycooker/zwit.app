import React from "react";
import { useRouter } from 'next/router'

import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import NotesElement from "@/components/notes/notesId";



export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
      return {
          redirect: {
              destination: '/auth',
              pernament: false,
          }
      }
  }

  return {
      props: {}
  }
}



const NotesId = () => {


  return (
    <>
      <NotesElement/>
    </>
  )

}
  
export default NotesId