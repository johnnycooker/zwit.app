import Input from "@/components/auth/Input";
import BottomText from "@/components/bottomText/bottomText";
import Version from "@/components/version/version";
import Head from "next/head";
import { useCallback, useState } from "react";
import axios from "axios";
import {signIn} from 'next-auth/react';


const Auth = () => {

    
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [variantLogin, setVariantLogin] = useState('login');

    const toggleVariantLogin = useCallback(() => {
        setVariantLogin((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    const login = useCallback(async () => {
        try{
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/'
            })
        
        } catch (error) {
            console.log(error)
        }

    }, [email, password])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                password
            })
            login()
        } catch (error){
            console.log(error)
        }
    }, [email,password, login]);


    return (
      <>
        <Head>
            <title>{variantLogin === 'login' ? "Logowanie - ZWIT" : "Rejestracja - ZWIT"}</title>
        </Head>
        <div className="relative h-full w-full bg-[url('/images/zwit_tlo.webp')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-70">
                <nav className="px-12 py-7 ">
                    <img src="/images/logo_zabka.webp" alt="Logo" className="h-14 "/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-4 lg:2/5 lg:max-w-lg rounded-lg w-full">
                        <h2 className="text-green-700 text-4xl mb-8 font-semibold text-center">
                           {variantLogin === 'login' ? "Logowanie" : "Rejestrowanie"} 
                        </h2>
                        <div className="flex flex-col gap-4">
                            <Input label="Email" onChange={(ev: any) => setEmail(ev.target.value)} id="email" type="email" value={email} />
                            <Input label="Hasło" onChange={(ev: any) => setPassword(ev.target.value)} id="password" type="password" value={password} />
                        </div>
                        <button onClick={variantLogin === 'login' ? login : register} className="bg-green-800 py-3 text-zinc-300 rounded-md w-full mt-10 hover:bg-green-700 cursor-pointer">
                            {variantLogin === 'login' ? "Zaloguj się" : "Zarejestruj się"}
                        </button>
                        <p className="text-neutral-500 mt-12 text-center">
                            {variantLogin === 'login' ? "Nie utworzyłeś konta?" : "Masz już konto?"}
                            <span onClick={toggleVariantLogin} className="text-green-700 ml-1 cursor-pointer hover:text-green-600">
                                {variantLogin === 'login' ? "Utwórz nowe konto ZWIT." : "Zaloguj się do ZWIT."} 
                            </span>  
                        </p>
                        {variantLogin === 'login' ?
                        <div>
                            <p className="text-neutral-500 mt-12 text-center">
                                Założyłeś konto przez pocztę gmail?
                            </p>
                            <p onClick={() => signIn('google', {callbackUrl: '/'})} className="text-green-700 ml-1 cursor-pointer hover:text-green-600 text-center">
                                Zaloguj się przez gmail. 
                            </p>  
                        </div>
                        : null}
                    </div>
                </div>
                <BottomText />
                <Version />
            </div>
        </div>
      </>
    )
}

export default Auth;