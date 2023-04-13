interface GprsConfigProps {
    router: string
    config: string
    vpn: string
    shop: string
}

const GprsConfig: React.FC<GprsConfigProps> = ({ router, config, vpn, shop }) => {
    return (
        <div className="flex justify-center">
          <div className="bg-green-900 bg-opacity-95 px-5 py-5 top-[27rem] absolute max-w-4xl  rounded-lg w-full flex justify-center gap-3 border-2 border-green-600">
              <div className="font-bold text-white">
                <h2 className="py-3 px-6">DANE DO ZESTAWIENIA VPN:</h2>
                <div className="bg-neutral-800 border-2 border-green-600 rounded-lg py-4 px-6 bg-opacity-80">
                  <p>no username zabka.expert privilege 15 secret 5 $1$uTvt$nRNZcFeM0h/TnnxN3mrXm.</p>
                  <p>username zabka.expert privilege 1 secret {router}</p>
                  <p>no enable secret 5 $1$p0JQ$XXOJ0Yh7q9ZdqPs.fD/85.</p>
                  <p>enable secret 0 {config}</p>
                  <p>crypto ipsec client ezvpn HQ-RA</p>
                  <p>username SHOP-RA.z{shop} password {vpn}</p>
                </div>
              </div>
          </div>
        </div>
    )
}

export default GprsConfig