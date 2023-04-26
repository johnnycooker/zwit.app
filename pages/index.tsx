import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Layout from "@/components/layout/layout"
import HomeComponent from "@/components/home/homeComponent";


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

const Home = () => {

  return (
    <>
      <Head>
          <title>ZWIT - Menu</title>
      </Head>
      <HomeComponent />
    </>
  )
}

export default Home
