import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react"
import MenuItem from "./menuItem";
import Logout from "./logout";

interface AcoountMenuProps {
    visible?: boolean;
}

const Menu: React.FC<AcoountMenuProps> = ({
    visible
}) => {
    
    const {data} = useCurrentUser();

    if(!visible) {
        return null;
    }

    
    
    return (
        <>
            <div className="bg-green-700 w-64 bg-opacity-50 absolute top-14 right-0 py-5 flex-col border-[1.5px] border-opacity-40 border-green-500 flex rounded-sm" >
                <div className="flex flex-col gap-3">
                    <MenuItem label={data?.name}/>
                    <MenuItem label={data?.name}/>
                    <Logout />
                </div>
            </div>
        </>
    )
}

export default Menu