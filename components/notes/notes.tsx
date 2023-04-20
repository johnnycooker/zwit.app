import Layout from "@/components/layout/layout"

import React, { useState, useEffect } from "react";
import axios from "axios";

import Link from "next/link";
import NotesInput from "@/components/notes/notesInput";
import NotesButton from "@/components/notes/notesButton";
import NoteLink from "./noteLink";
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface Link {
  id: string;
  name: string;
  url: string;
}

interface CurrentUser {
  id: string;
}



const NotesPageComponent = () => {

  
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

  useEffect(() => {
    if (currentUser?.id) {
    axios.get(`${FirebaseUrl}/links/${currentUser?.id}/link.json`).then((response) => {
      if (response.data) {
        const fetchedLinks = Object.keys(response.data).map((key) => {
          return {
            ...response.data[key],
            id: key,
          };
        });
        setLinks(fetchedLinks);
      }
    });
    }
    
  }, [currentUser?.id]);

  const handleAddLink = () => {
    axios.post(`${FirebaseUrl}/links/${currentUser?.id}/link.json`, { name, url: `/${name}` }).then((response) => {
      setLinks([...links, { id: response.data.name, name, url: `/${name}` }]);
      setName("");
    });
  };

  const handleDeleteLink = (id: string) => {
    axios.delete(`${FirebaseUrl}/links/${currentUser?.id}/link/${id}.json`).then(() => {
      setLinks(links.filter((link) => link.id !== id));
    });
  };

  const handleEditLink = (id: string, name: string) => {
    const newName = prompt("Enter new name", name);
    if (newName) {
      axios.patch(`${FirebaseUrl}/links/${currentUser?.id}/link.json`, { name: newName }).then(() => {
        setLinks(links.map((link) => (link.id === id ? { ...link, name: newName } : link)));
      });
    }
  };



  return (
    <>
        <Layout>
            <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
            <div className="flex-wrap justify-center top-[8rem] absolute left-[2rem] w-11/12 ">
                <div className="flex flex-row gap-28 w-full ">

                    <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 w-full  max-w-[15rem] min-h-[48rem] h-fit  rounded-lg  border-2 border-green-600 border-opacity-20">
                      <div>
                        {links.map((link) => (
                          <ul key={link.id} className="flex flex-row pb-2">
                            <NoteLink url={link.url} label={link.name}/>
                            <EditButton onClick={() => handleEditLink(link.id, link.name)} />
                            <DeleteButton size="20" classes="" color="white" onClick={() => handleDeleteLink(link.id)} />
                          </ul>
                        ))}
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
                        <NotesButton onClick={handleAddLink} label="Stwórz folder"/>
                      </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )

}
  
export default NotesPageComponent