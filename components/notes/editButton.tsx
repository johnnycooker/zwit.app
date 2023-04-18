import React from "react"

import {AiOutlineEdit} from "react-icons/ai"

interface InputProps {
    onClick: any
}

const EditButton: React.FC<InputProps> = ({ onClick }) => {
    return (
        <button className="text-white hover:text-green-500 pl-2" onClick={onClick}><AiOutlineEdit size={20} /></button>
    )
}

export default EditButton;