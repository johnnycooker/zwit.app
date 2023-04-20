import React from "react"

import {AiOutlineEdit} from "react-icons/ai"

interface InputProps {
    onClick?: any
}

const BackgroundSetter: React.FC<InputProps> = (props:any, { onClick }) => {
    return (
        
            <div className="relative h-full w-full bg-[url('/images/tlo_menu.webp')] bg-no-repeat  bg-fixed bg-cover">
                <div className="bg-black w-full h-full lg:bg-opacity-80">
                </div>
            </div>
        
    )
}

export default BackgroundSetter;