import BottomText from "@/components/bottomText/bottomText";
import Navbar from "@/components/navbar/navbar";
import Version from "@/components/bottomText/version";
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

const Home = () => {

  return (
    <>
      <Head>
          <title>ZWIT - Menu</title>
      </Head>
      <Navbar />
      <div className="relative h-full w-full bg-[url('/images/tlo_menu.webp')] bg-no-repeat  bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-95">

        </div>
      </div>
      <BottomText />
    </>
  )
}

export default Home
