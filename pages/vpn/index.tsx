import Layout from "@/components/layout/layout"
import SwitchButtons from "@/components/vpn/switchButtons"

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

const Vpn = () => {

  return (
    <>
      <Head>
          <title>ZWIT - VPN</title>
      </Head>
      <Layout>
        <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
        <SwitchButtons />
      </Layout>
    </>
  )
}
  
export default Vpn