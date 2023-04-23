import React from "react"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import Background from "@/components/background/background"

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

const BackgroundPage = () => {
  

  return (
    <>
      <Background  />
      
    </>
  );
};

export default BackgroundPage