import React from "react"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import IncidentsPageComponent from "@/components/incidents/incidents"
import Head from "next/head";


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
      <Head>
          <title>ZWIT - Zgłoszenia</title>
      </Head>
      <IncidentsPageComponent />
    </>
  )

}
  
export default Incidents