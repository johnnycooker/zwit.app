import React, { useEffect } from "react";
import { NextPageContext } from "next"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import IncidentElement from "@/components/incidents/incidentId";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
      return {
          redirect: {
              destination: '/auth',
              permanent: false,
          }
      }
  }

  return {
      props: {}
  }
}

const IncidentId = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      router.reload();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <IncidentElement />
    </>
  )
}
  
export default IncidentId;