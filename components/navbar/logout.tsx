import { signOut } from "next-auth/react"

export default function Logout() {
    return (
        <>
            <div onClick={() => signOut()} className="px-3 text-center text-white text-md hover:opacity-70">
                Wyloguj się
            </div>
        </>
    )
}