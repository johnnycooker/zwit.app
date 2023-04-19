import Link from "next/link";
import React from "react";

interface IncidentLinkProps {
    label: string;
    url: string;
}

const IncidentLink: React.FC<IncidentLinkProps> = ({
    label, url
}) => {
    return (
        <>
            <li className="hover:text-green-500 text-white"><Link href={`/incidents${url}`}>{label}</Link></li>
        </>
    )
}

export default IncidentLink;