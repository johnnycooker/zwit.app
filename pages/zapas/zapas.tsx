import Layout from "@/components/layout/layout"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import NoteLink from "@/components/notes/noteLink";

import { NextPage } from "next";
import { useRouter } from 'next/router'





const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface Path {
  id?: string;
  text: string;
  editable?: boolean;
}

interface Link {
  id: string;
  name: string;
  url: string;
}

interface CurrentUser {
  id: string;
}




const NotesElement: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const [name, setName] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [path, setPath] = useState<Path[]>([]);

  const router = useRouter();
  const { notesId } = router.query;
  
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

  const handleGenerateClick = (text: string) => {
    console.log(text);
    axios
      .post(`${FirebaseUrl}/notes/${currentUser?.id}/${notesId}.json`, { text })
      .then((response) => {
        setPath([...path, { id: response.data.name, text }]);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleSaveClick = (linkId: string, updatedText: string) => {
    const updatedLinks = [...path];
    const linkToUpdate = updatedLinks.find((link) => link.id === linkId);
    if (linkToUpdate) {
      axios
        .put(`${FirebaseUrl}/notes/${currentUser?.id}/${notesId}/${linkId}.json`, { text: updatedText })
        .then(() => {
          linkToUpdate.text = updatedText;
          linkToUpdate.editable = false;
          setPath(updatedLinks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteClick = (linkId: string) => {
    axios
      .delete(`${FirebaseUrl}/notes/${currentUser?.id}/${notesId}/${linkId}.json`)
      .then(() => {
        const updatedLinks = path.filter((link) => link.id !== linkId);
        setPath(updatedLinks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser?.id) {
    axios.get(`${FirebaseUrl}/notes/${currentUser?.id}/${notesId}.json`).then((response) => {
      if (response.data) {
        const fetchedLinks = Object.keys(response.data).map((key) => {
          return {
            ...response.data[key],
            id: key,
            editable: false,
          };
        });
        setPath(fetchedLinks);
      }
    });
    }
  }, [currentUser?.id, notesId]);



  return (
    <>
        <Layout>
            <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
            <div className="flex-wrap justify-center top-[8rem] absolute left-[2rem] w-11/12 ">
                <div className="flex flex-row gap-28 w-full ">

                    <div className="bg-zinc-900 bg-opacity-90 px-5 py-5 w-full  max-w-[15rem] h-[30rem]  rounded-lg  border-2 border-green-600 border-opacity-20">
                      <div >
                        {links.map((link) => (
                          <ul key={link.id}>
                            <NoteLink url={link.url} label={link.name}/>
                          </ul>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="bg-zinc-900 bg-opacity-90 px-5 py-5 mb-4 h-full  max-w-10/12 rounded-lg text-center border-2 border-green-600 border-opacity-20 w-full">
                        <div className="">
                          
                        </div>
                      </div>
                      <div className="bg-zinc-900 bg-opacity-90 px-5 py-5 mb-4 h-full w-full max-w-10/12 rounded-lg text-center border-2 border-green-600 border-opacity-20">
                        <div className="text-left">
                          <ul>
                            {path.map((link) => (
                              <li key={link.id}>
                                {link.editable ? (
                                  <textarea defaultValue={link.text} onChange={(e) => { if (link.id) handleSaveClick(link.id, e.target.value) }}></textarea>
                                ) : (
                                  <div dangerouslySetInnerHTML={{ __html: link.text }}></div>
                                )}
                                {!link.editable && (
                                  <>
                                    <button onClick={() => { if (link.id) handleDeleteClick(link.id) }}>Delete</button>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )

}
  
export default NotesElement