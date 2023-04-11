import Button from "./button"

const SwitchButtons = () => {

    return (
        <>
          <div className="flex justify-center">
            <div className="bg-green-900 bg-opacity-95 px-5 py-5 top-[6rem] absolute lg:2/5 lg:max-w-lg  rounded-lg w-full flex flex-row gap-3 border-2 border-green-600">
              <Button link="gprs" label="GPRS"/>
              <Button link="normal" label="Stałe Łącze" />
            </div>
          </div>
        </>
    )
  }
    
  export default SwitchButtons