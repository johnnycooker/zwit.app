import VpnInput from "./vpnInput"

interface PasswordsFormProps {
    onSubmit: any,
    onChangeRouter: any,
    valueRouter: string,
    onChangeConfig: any,
    valueConfig: string,
    onChangeVpn: any,
    valueVpn: string,
    
}

const PasswordsForm: React.FC<PasswordsFormProps> = ({ onSubmit, onChangeRouter, valueRouter, onChangeConfig, valueConfig, onChangeVpn, valueVpn}) => {
  return (
        <div>
            <p className="font-bold text-white py-3">Podaj hasła</p>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-row gap-2 pb-2">
                        <VpnInput
                            label="Hasło Router"
                            value={valueRouter}
                            onChange={onChangeRouter}
                        />
                        <VpnInput
                            label="Hasło Router Konfiguracja"
                            value={valueConfig}
                            onChange={onChangeConfig}
                        />
                        <VpnInput
                            label="Hasło VPN"
                            value={valueVpn}
                            onChange={onChangeVpn}
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
    )
}

export default PasswordsForm