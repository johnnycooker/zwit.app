import NavbarItem from "./navbarItem"

import{ FiSettings } from 'react-icons/fi'
import { BsChevronDown } from 'react-icons/bs'
import { useCallback, useState } from "react"
import Menu from "./menu"
import Link from "next/link"



const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);


    const toggleMenu = useCallback(() => {
        setShowMenu((current) => !current)
    }, [])

    return (
        <>
        <nav className="w-full fixed z-40">
            <div className={"px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-green-700 border-green-500 border-[1.5px] border-opacity-40 bg-opacity-50"}>
                <Link href='/'><img src='/images/logo_zabka_biale.png' alt='Logo' className="h-8 w-20 cursor-pointer"/></Link>
                <div className="flex flex-row-reverse ml-auto gap-4 items-center">
                    <div onClick={toggleMenu} className="flex flex-row items-center ml-8 cursor-pointer relative">
                        <div className="flex flex-row gap-1 items-center">
                            <FiSettings className="hover:animate-spin text-white " size={25}/>
                            <BsChevronDown className={`text-white transition ${showMenu ? 'rotate-180' : 'rotate-0'}`}/>
                        </div>
                        <div onMouseLeave={toggleMenu}>
                            <Menu visible={showMenu} />
                        </div>
                    </div>
                    <div className="flex-row gap-9 flex">
                        <Link href='/vpn'><NavbarItem label="Zestawianie VPN"/></Link>
                        <Link href='/notes'><NavbarItem label="Notatki"/></Link>
                        <Link href='/insets'><NavbarItem label="Wklejki"/></Link>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar