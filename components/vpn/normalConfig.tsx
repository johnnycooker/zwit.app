interface NormalConfigProps {
    router: string
    config: string
    vpn: string
}

const NormalConfig: React.FC<NormalConfigProps> = ({ router, config, vpn }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 top-[27rem] absolute max-w-4xl  rounded-lg w-full flex justify-center gap-3 border-2 border-green-600 border-opacity-30">
          <div className="font-bold text-white">
            <h2 className="py-3 px-6">DANE DO ZESTAWIENIA VPN:</h2>
            <div className="bg-neutral-800 border-2 border-green-600 border-opacity-30 rounded-lg py-4 px-6 bg-opacity-80">
                <p>no username zabka.expert privilege 15 secret 5 $1$uTvt$nRNZcFeM0h/TnnxN3mrXm.</p>
                <p>username zabka.expert privilege 1 secret {router}</p>
                <p>no enable secret 5 $1$p0JQ$XXOJ0Yh7q9ZdqPs.fD/85.</p>
                <p>enable secret 0 {config}</p>
                <p>no crypto isakmp key DuMyN7X3m7Bn address 194.88.128.20 no-xauth</p>
                <p>crypto isakmp key {vpn} address 194.88.128.20 no-xauth</p>
            </div>
          </div>
      </div>
    </div>
)
}

export default NormalConfig



