import AccountMenu from "@/components/accountMenu";
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
      <div className="flex items-center h-full justify-center">
        <div className="mt-4 text-gray-400 text-3xl text-center group-hover:text-white">
          {user?.name}
          <AccountMenu visible/>
        </div>
      </div>
    </>
  )
}

export default Home
