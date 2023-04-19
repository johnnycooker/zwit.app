import React from "react";
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import NotesPageComponent from "@/components/notes/notes";


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


const Incidents = () => {


  return (
    <>
      <NotesPageComponent />
    </>
  )

}
  
export default Incidents