import React from "react"

interface InputProps {
    onChange: any
    value: string
    label: string
    type: string
}

const BackgroundInput: React.FC<InputProps> = ({ onChange, value, label, type }) => {
    return (
        <div className="relative min-w-[40rem] w-fit">
            <input  value={value} onChange={onChange} type={type}
                className="block rounded-md px-6 pt-7 pb-1 w-full text-sm text-green-700 bg-neutral-800 appearance-none focus:outline-none focus:ring-0 peer border-green-700 border-opacity-60 border-solid border-[1px] hover:border-green-500 bg-opacity-80"
                placeholder=" "/>
            <label className="absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" 
            >
                {label}
            </label>
        </div>
    )
}

export default BackgroundInput;