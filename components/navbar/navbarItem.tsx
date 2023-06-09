import React from "react"

interface NavbarItemProps {
    label: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label
}) => {
    return (
        <>
            <div className="text-white cursor-pointer hover:opacity-70 transition text-semibold text-lg">
                {label}
            </div>
        </>
    )
}

export default NavbarItem