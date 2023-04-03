import Input from "@/components/Input";
import { useState } from "react";

const Auth = () => {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <>
        <div className="relative h-full w-full bg-[url('/images/zwit_tlo.webp')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-70">
                <nav className="px-12 py-7">
                    <img src="/images/logo_zabka.webp" alt="Logo" className="h-14"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-4 lg:2/5 lg:max-w-lg rounded-lg w-full">
                        <h2 className="text-green-700 text-4xl mb-8 font-semibold text-center">
                            Logowanie
                        </h2>
                        <div className="flex flex-col gap-4">
                            <Input label="Email" onChange={(ev: any) => setEmail(ev.target.value)} id="email" type="email" value={email} />
                            <Input label="Hasło" onChange={(ev: any) => setPassword(ev.target.value)} id="password" type="password" value={password} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}

export default Auth;