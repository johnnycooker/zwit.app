import React from "react"

interface VpnInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const VpnInput = ({ label, value, onChange }: VpnInputProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="relative">
            <input type="text" value={value} onChange={handleChange} required
                className="block rounded-md px-1 pt-6  w-64  text-md text-green-700 bg-neutral-800 appearance-none focus:outline-none focus:ring-0 peer border-green-700 border-solid border-[1px] hover:border-green-500 bg-opacity-80"
                placeholder=" "/>
            <label className="absolute text-sm text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" 
            >
                {label}
            </label>
        </div>
    )
}

export default VpnInput;

