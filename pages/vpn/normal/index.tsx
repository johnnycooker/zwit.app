import Layout from "@/components/layout/layout";
import NormalConfig from "@/components/vpn/normalConfig";
import PasswordsForm from "@/components/vpn/passwordsForm";
import SwitchButtons from "@/components/vpn/switchButtons";
import { useState } from "react";

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

const Normal = () => {
  const [formData, setFormData] = useState({
    routerPassword: "",
    vpnPassword: "",
    configPassword: '',
  });
  const [showData, setShowData] = useState(false);
 
  const [submittedData, setSubmittedData] = useState({
    routerPassword: "",
    vpnPassword: "",
    configPassword: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData({
      routerPassword: formData.routerPassword,
      vpnPassword: formData.vpnPassword,
      configPassword: formData.configPassword,
    });
    setShowData(true);
    setFormData({
      routerPassword: '',
      vpnPassword: '',
      configPassword: '',
      
    });
  };

  return (
    <Layout>
      <SwitchButtons />
      <div className="flex justify-center">
        <div className="bg-green-900 bg-opacity-95 px-5 py-5 top-[14rem] absolute max-w-4xl  rounded-lg w-full flex justify-center gap-3 border-2 border-green-600">
          <div className="text-xl text-center">
            <PasswordsForm onSubmit={handleSubmit} 
              onChangeRouter={(value:any) => handleInputChange("routerPassword", value)} 
              valueRouter={formData.routerPassword} 
              onChangeConfig={(value:any) => handleInputChange("configPassword", value)} 
              valueConfig={formData.configPassword} 
              onChangeVpn={(value:any) => handleInputChange("vpnPassword", value)} 
              valueVpn={formData.vpnPassword}
            />
          </div>
        </div>
      </div>
      {showData && (
        <NormalConfig router={submittedData.routerPassword} config={submittedData.configPassword} vpn={submittedData.vpnPassword}/>
      )}
    </Layout>
  );
}
  
export default Normal