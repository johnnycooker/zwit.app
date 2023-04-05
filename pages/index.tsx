import AccountMenu from "@/components/accountMenu";
import Navbar from "@/components/navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
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

const Home = () => {
  
  const { data: user } = useCurrentUser();

  return (
    <>
      <Navbar />
    </>
  )
}

export default Home
