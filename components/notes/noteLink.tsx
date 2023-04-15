import Link from "next/link";
import React from "react";

interface InsetLinkProps {
    label: string;
    url: string;
}

const NoteLink: React.FC<InsetLinkProps> = ({
    label, url
}) => {
    return (
        <>
            <li className="hover:text-green-500 text-white"><Link href={`/notes/${url}`}>{label}</Link></li>
        </>
    )
}

export default NoteLink;