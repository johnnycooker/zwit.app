import Link from "next/link";
import React from "react";

interface MenuItemProps {
    label: string;
}

const BackgroundItem: React.FC<MenuItemProps> = ({
    label
}) => {
    return (
        <>
            <Link href="/background" className="px-3 text-center text-white hover:opacity-70 text-md">
                {label}
            </Link>
            <hr className="bg-green-700 border-0 h-px my-4 opacity-70" />
        </>
    )
}

export default BackgroundItem;