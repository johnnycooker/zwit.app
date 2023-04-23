import Link from "next/link"
import React from "react"

interface ButtonProps {
    label: string
    link: string
}

const Button: React.FC<ButtonProps> = ({ label, link }) => {
    return (
        <Link href={`/vpn/${link}`} className="bg-green-700 py-3 text-zinc-300 text-lg rounded-md w-full text-center mt-1 hover:bg-green-600 cursor-pointer border-black border-opacity-60 border-2">
            {label}
        </Link>
    )
}

export default Button