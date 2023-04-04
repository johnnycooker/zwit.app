import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react"
import React from "react"

interface AcoountMenuProps {
    visible?: boolean;
}

const AccountMenu: React.FC<AcoountMenuProps> = ({
    visible
}) => {
    
    const {data} = useCurrentUser();

    if(!visible) {
        return null;
    }

    
    return (
        <>
            <div className="bg-black w-64 bg-opacity-70 absolute top-14  py-5 border-2 border-gray-800 flex" >
                <div className="flex flex-col gap-3">
                    <div onClick={() => signOut()} className="px-3 text-center text-green-700 text-sm hover:text-green-500 cursor-pointer">
                        Wyloguj się
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountMenu