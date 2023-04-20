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
        <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
      </Layout>
    </>
  )
}

export default Home
