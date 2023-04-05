import NavbarItem from "./navbarItem"

import{ FiSettings } from 'react-icons/fi'
import { BsChevronDown } from 'react-icons/bs'
import { useCallback, useState } from "react"
import AccountMenu from "./accountMenu"



const Navbar = () => {

    const [showAccountMenu, setShowAccountMenu] = useState(false);


    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [])

    return (
        <>
        <nav className="w-full fixed z-40">
            <div className={"px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-green-700 bg-opacity-70"}>
                <img src='/images/logo_zabka_biale.png' alt='Logo' className="h-8 w-24"/>
                <div className="flex flex-row-reverse ml-auto gap-4 items-center">
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-9 h-7 rounded-md overflow-hidden">
                            <img src="/images/default-red.png" alt=""/>
                        </div>
                        <div className="flex flex-row gap-1 items-center">
                            <div>
                                <FiSettings className="hover:animate-spin text-white " size={25}/>
                            </div>
                            <div>
                                <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                            </div>
                            
                        </div>
                        <div onMouseLeave={toggleAccountMenu}>
                            <AccountMenu visible={showAccountMenu} />
                        </div>
                    </div>
                    <div className="flex-row gap-9 flex">
                        <NavbarItem label="Zestawianie VPN"/>
                        <NavbarItem label="Notatki"/>
                        <NavbarItem label="Wklejki"/>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar