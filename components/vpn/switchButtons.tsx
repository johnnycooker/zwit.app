import Link from "next/link"

const SwitchButtons = () => {

    return (
        <>
          <div className="flex justify-center">
            <div className="bg-green-900 bg-opacity-95 px-5 py-5 top-[6rem] absolute lg:2/5 lg:max-w-lg  rounded-lg w-full flex flex-row gap-3 border-2 border-green-600">
              <Link href="/vpn/gprs" className="bg-green-600 py-3 text-zinc-300 text-lg rounded-md w-full text-center mt-1 hover:bg-green-700 cursor-pointer border-black border-opacity-60 border-2">
                GPRS
              </Link>
              <Link href="/vpn/normal" className="bg-green-600 py-3 text-zinc-300 text-lg rounded-md w-full mt-1 text-center hover:bg-green-700 cursor-pointer border-black border-opacity-60 border-2">
                Stałe łącze
              </Link>  
            </div>
          </div>
        </>
    )
  }
    
  export default SwitchButtons