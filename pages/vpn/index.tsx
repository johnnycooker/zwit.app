import Layout from "@/components/layout/layout"
import SwitchButtons from "@/components/vpn/switchButtons"

import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

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
      <Layout>
        <SwitchButtons />
      </Layout>
    </>
  )
}
  
export default Vpn