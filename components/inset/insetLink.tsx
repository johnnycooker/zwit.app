import Link from "next/link"
import React from "react"

interface InsetLinkProps {
    label: string
    url: string
}

const InsetLink: React.FC<InsetLinkProps> = ({
    label, url
}) => {
    return (
        <>
            <li className="hover:text-green-500 text-white"><Link href={`/insets/${url}`}>{label}</Link></li>
        </>
    )
}

export default InsetLink