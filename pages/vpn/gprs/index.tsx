import Layout from "@/components/layout/layout"
import GprsConfig from "@/components/vpn/gprsConfig"
import PasswordsForm from "@/components/vpn/passwordsForm"
import ShopForm from "@/components/vpn/shopForm"
import SwitchButtons from "@/components/vpn/switchButtons"
import { useState } from "react"

import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"

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

const Gprs = () => {
  const [formData, setFormData] = useState({
    routerPassword: "",
    vpnPassword: "",
    configPassword: '',
    shopNumber: ''
  })
  const [showData, setShowData] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [submittedData, setSubmittedData] = useState({
    routerPassword: "",
    vpnPassword: "",
    configPassword: '',
    shopNumber: ''
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowNext(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData({
      routerPassword: formData.routerPassword,
      vpnPassword: formData.vpnPassword,
      configPassword: formData.configPassword,
      shopNumber: formData.shopNumber
    });
    setShowData(true);
    setShowNext(false);
    setFormData({
      routerPassword: '',
      vpnPassword: '',
      configPassword: '',
      shopNumber: ''
    })
  }

  return (
    <>
      <Head>
          <title>VPN - GPRS</title>
      </Head>
      <Layout>
        <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
        <SwitchButtons />
        <div className="flex justify-center">
          <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 top-[14rem] absolute max-w-4xl  rounded-lg w-full flex justify-center gap-3 border-2 border-green-600">
            <div className="text-xl text-center">
              {showNext ? (
                <PasswordsForm onSubmit={handleSubmit} 
                onChangeRouter={(value:any) => handleInputChange("routerPassword", value)} 
                valueRouter={formData.routerPassword} 
                onChangeConfig={(value:any) => handleInputChange("configPassword", value)} 
                valueConfig={formData.configPassword} 
                onChangeVpn={(value:any) => handleInputChange("vpnPassword", value)} 
                valueVpn={formData.vpnPassword}
              />
              ) : (
                <ShopForm value={formData.shopNumber} onChange={(value:any) => handleInputChange("shopNumber", value)} onSubmit={handleNext}/>
              )}
            </div>
          </div>
        </div>
        {showData && (
          <GprsConfig router={submittedData.routerPassword} config={submittedData.configPassword} vpn={submittedData.vpnPassword} shop={submittedData.shopNumber}/>
        )}
      </Layout>
    </>
  );
};

export default Gprs

  