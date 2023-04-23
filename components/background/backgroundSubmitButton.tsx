import React from "react"

interface InputProps {
    label: string
}

const BackgroundSubmitButton: React.FC<InputProps> = ({ label }) => {
    return (
        <button className="bg-green-800 py-1 text-zinc-300 text-lg rounded-md w-full text-center mt-2 hover:bg-green-600 cursor-pointer border-black border-opacity-30 border-[0.05rem]" type="submit">{label}</button>
    )
}

export default BackgroundSubmitButton