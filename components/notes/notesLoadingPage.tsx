import Layout from "@/components/layout/layout"

import React, { useState, useEffect } from "react";

import Link from "next/link";
import NotesInput from "@/components/notes/notesInput";
import NotesButton from "@/components/notes/notesButton";
import {VscLoading} from 'react-icons/vsc'
import useFetchLinks from "@/hooks/notes/useFetchLinks";

interface Link {
  id: string;
  name: string;
  url: string;
}

interface CurrentUser {
  id: string;
}



const NotesLoadingPage = () => {

  
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [name, setName] = useState("");
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch('/api/current');
      const data = await response.json();
      setCurrentUser(data);
    };
    fetchCurrentUser();
  }, []);

  useFetchLinks(currentUser, setLinks)

  return (
    <>
        <Layout>
            <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
            <div className="flex-wrap justify-center top-[8rem] absolute left-[2rem] w-11/12 ">
                <div className="flex flex-row gap-28 w-full ">

                    <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 w-full  max-w-[15rem] min-h-[48rem] h-fit  rounded-lg  border-2 border-green-600 border-opacity-20">
                      <div>
                        <p className="text-white pt-[5rem] flex justify-center "><VscLoading className="animate-spin" size={20}/></p>
                      </div>
                    </div>

                    <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 mb-4 h-full w-full max-w-10/12 rounded-lg text-center border-2 border-green-600 border-opacity-20">
                      <div>
                        <NotesInput
                          type="text"
                          id="note"
                          value={name}
                          onChange={(event:any) => setName(event.target.value)}
                          label="Podaj nazwę folderu"
                        />
                        <NotesButton onClick={null} label="Stwórz folder"/>
                      </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )

}
  
export default NotesLoadingPage