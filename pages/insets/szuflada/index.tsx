import React from "react"
import Inset from "@/components/inset/inset"

import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
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


const InsetSzuflada = () => {

  return (
    <>
      <Head>
          <title>Wklejki - Szuflada Kasowa</title>
      </Head>
      <Inset pageName="szuflada"/>
    </>
  )

}
  
export default InsetSzuflada