import React from "react"

interface InputProps {
    onClick?: any
    label?: string
}

const BackgroundButton: React.FC<InputProps> = ({ onClick, label }) => {
    return (
        <button className="bg-green-600 py-3 text-zinc-300 text-lg rounded-md w-[10rem] text-center mt-1 hover:bg-green-700 cursor-pointer border-black border-opacity-60 border-2" onClick={onClick}>{label}</button>
    )
}

export default BackgroundButton;