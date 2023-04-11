import Layout from "@/components/layout/layout";
import SwitchButtons from "@/components/vpn/switchButtons";
import VpnInput from "@/components/vpn/vpnInput";
import { useState } from "react";

const Gprs = () => {
  const [formData, setFormData] = useState({
    routerPassword: "",
    vpnPassword: "",
    configPassword: '',
    shopNumber: ''
  });
  const [showData, setShowData] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    routerPassword: "",
    vpnPassword: "",
    configPassword: '',
    shopNumber: ''
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
      shopNumber: formData.shopNumber
    });
    setShowData(true);
    setFormData({
      routerPassword: '',
      vpnPassword: '',
      configPassword: '',
      shopNumber: ''
    });
  };

  return (
    <Layout>
      <SwitchButtons />
      <div className="flex justify-center">
        <div className="bg-green-900 bg-opacity-95 px-5 py-5 top-[13rem] absolute max-w-4xl  rounded-lg w-full flex justify-center gap-3 border-2 border-green-600">
          <div className="text-xl text-center">
            <div className="mb-2 font-bold text-white">Uzupełnij dane</div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row gap-2 pb-2 justify-center">
                
                <VpnInput
                  label="Numer sklepu"
                  value={formData.shopNumber}
                  onChange={(value) => handleInputChange("shopNumber", value)}
                />
              </div>
              <div className="flex flex-row gap-2 pb-2">
                <VpnInput
                  label="Hasło Router"
                  value={formData.routerPassword}
                  onChange={(value) => handleInputChange("routerPassword", value)}
                />
                <VpnInput
                  label="Hasło Router Konfiguracja"
                  value={formData.configPassword}
                  onChange={(value) => handleInputChange("configPassword", value)}
                />
                <VpnInput
                  label="Hasło VPN"
                  value={formData.vpnPassword}
                  onChange={(value) => handleInputChange("vpnPassword", value)}
                />
            
              </div>
              <button
                type="submit"
                className="px-4 font-bold text-white bg-green-700 rounded-md hover:bg-green-500"
              >
                Generuj
              </button>
            </form>
          </div>
        </div>
      </div>
      {showData && (
        <div className="flex justify-center">
          <div className="bg-green-900 bg-opacity-95 px-5 py-5 top-[28rem] absolute max-w-4xl  rounded-lg w-full flex justify-center gap-3 border-2 border-green-600">
              <div className="font-bold text-white">
                <h2 className="py-3">DANE DO ZESTAWIENIA VPN:</h2>
                <p>no username zabka.expert privilege 15 secret 5 $1$uTvt$nRNZcFeM0h/TnnxN3mrXm.</p>
                <p>username zabka.expert privilege 1 secret {submittedData.routerPassword}</p>
                <p>no enable secret 5 $1$p0JQ$XXOJ0Yh7q9ZdqPs.fD/85.</p>
                <p>enable secret 0 {submittedData.configPassword}</p>
                <p>crypto ipsec client ezvpn HQ-RA</p>
                <p>username SHOP-RA.z{submittedData.shopNumber} password {submittedData.vpnPassword}</p>
              </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gprs;

  