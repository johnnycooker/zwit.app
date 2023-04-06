import BottomText from "@/components/bottomText/bottomText";
import Navbar from "@/components/navbar/navbar";
import Version from "@/components/bottomText/version";
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head";
import Layout from "@/components/layout/layout";


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
      <Layout>
        
      </Layout>
    </>
  )
}

export default Home
