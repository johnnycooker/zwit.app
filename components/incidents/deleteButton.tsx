import React from "react"

import {TiDeleteOutline} from "react-icons/ti"

interface InputProps {
    onClick: any
    color: string
    classes: string
    size: string
}

const DeleteButton: React.FC<InputProps> = ({ onClick, color, classes, size }) => {
    return (
        <button className={`text-${color} hover:text-green-500 px-1 ${classes}`} onClick={onClick}><TiDeleteOutline size={size}/></button>
    )
}

export default DeleteButton;