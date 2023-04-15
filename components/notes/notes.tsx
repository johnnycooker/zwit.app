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

const NotesPageComponent = () => {

  const [name, setName] = useState("");
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    axios.get(`${FirebaseUrl}/links.json`).then((response) => {
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
  }, []);

  const handleAddLink = () => {
    axios.post(`${FirebaseUrl}/links.json`, { name, url: `/${name}` }).then((response) => {
      setLinks([...links, { id: response.data.name, name, url: `/${name}` }]);
      setName("");
    });
  };

  const handleDeleteLink = (id: string) => {
    axios.delete(`${FirebaseUrl}/links/${id}.json`).then(() => {
      setLinks(links.filter((link) => link.id !== id));
    });
  };

  const handleEditLink = (id: string, name: string) => {
    const newName = prompt("Enter new name", name);
    if (newName) {
      axios.patch(`${FirebaseUrl}/links/${id}.json`, { name: newName }).then(() => {
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

                    <div className="bg-zinc-900 bg-opacity-90 px-5 py-5 w-full  max-w-[15rem] h-[30rem]  rounded-lg  border-2 border-green-600 border-opacity-20">
                      <div >
                        {links.map((link) => (
                          <ul key={link.id} className="flex flex-row">
                            <NoteLink url={link.url} label={link.name}/>
                            <EditButton onClick={() => handleEditLink(link.id, link.name)} />
                            <DeleteButton onClick={() => handleDeleteLink(link.id)} />
                          </ul>
                        ))}
                      </div>
                    </div>

                    <div className="bg-zinc-900 bg-opacity-90 px-5 py-5 mb-4 h-full w-full max-w-10/12 rounded-lg text-center border-2 border-green-600 border-opacity-20">
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