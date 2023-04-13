import VpnInput from "./vpnInput"

interface ShopFormProps {
    onSubmit: any,
    onChange: any,
    value: string
}

const ShopForm: React.FC<ShopFormProps> = ({ onChange, onSubmit, value }) => {
  return (
    <div>
        <p className="font-bold text-white py-3">Podaj numer sklepu</p>
        <form onSubmit={onSubmit}>
          <div className="flex flex-row gap-2 pb-2 justify-center">
            <VpnInput
              label="Numer sklepu"
              value={value}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="px-4 font-bold text-white bg-green-700 rounded-md hover:bg-green-500"
          >
            Dalej
          </button>
        </form>
    </div>
)
}

export default ShopForm