import React from "react";

interface MenuItemProps {
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    label
}) => {
    return (
        <>
            <div className="px-3 text-center text-white hover:opacity-70 text-md">
                <p className="">Użytkownik: {label}</p>
            </div>
            <hr className="bg-green-700 border-0 h-px my-4 opacity-70" />
        </>
    )
}

export default MenuItem;