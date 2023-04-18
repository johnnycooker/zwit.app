import React from "react"

import {TiDeleteOutline} from "react-icons/ti"

interface InputProps {
    onClick: any
    
}

const DeleteButton: React.FC<InputProps> = ({ onClick }) => {
    return (
        <button className="text-white hover:text-green-500 px-1" onClick={onClick}><TiDeleteOutline size={20}/></button>
    )
}

export default DeleteButton;