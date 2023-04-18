import Layout from "@/components/layout/layout"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import NoteLink from "@/components/notes/noteLink";

import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';


import { NextPage } from "next";
import { useRouter } from 'next/router'

const FirebaseUrl = "https://zwit-cba2d-default-rtdb.europe-west1.firebasedatabase.app/";

interface ObjectData {
  id: string;
  data: string;
}

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: { matchVisual: false },
};

const formats = [
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'indent',
  'link',
  'image',
  'video',
];

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

  
  const [links, setLinks] = useState<Link[]>([]);
  const [path, setPath] = useState<Path[]>([]);
  const [value, setValue] = useState('');
  const [objects, setObjects] = useState<ObjectData[]>([]);

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



  useEffect(() => {
    axios.get<ObjectData[]>(`${FirebaseUrl}/notes/${currentUser?.id}/${notesId}/objects.json`)
      .then(response => {
        if (response.data) {
          const fetchedObjects: ObjectData[] = [];
          for (const key in response.data) {
            fetchedObjects.push({
              id: key,
              data: response.data[key].data
            });
          }
          setObjects(fetchedObjects);
        }
      })
      .catch(error => console.error(error));
  }, [currentUser?.id, notesId]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleGenerateClick = () => {
    const newObject: ObjectData = {
      id: Date.now().toString(),
      data: value
    };

    axios.post(`${FirebaseUrl}/notes/${currentUser?.id}/${notesId}/objects.json`, newObject)
      .then(response => {
        setObjects(prevObjects => [...prevObjects, {
          id: response.data.name,
          data: newObject.data
        }]);
      })
      .catch(error => console.error(error));
    setValue('');
  };

  const handleDeleteClick = (objectId: string) => {
    axios.delete(`${FirebaseUrl}/notes/${currentUser?.id}/${notesId}/objects/${objectId}.json`)
      .then(() => {
        setObjects(prevObjects => prevObjects.filter(obj => obj.id !== objectId));
      })
      .catch(error => console.error(error));
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
                          <div>
                            <style>{`
                              .ql-size-small {
                                  font-size: 10px;
                              }
                              .ql-size-large {
                                  font-size: 20px;
                              }
                              .ql-size-huge {
                                  font-size: 36px;
                              }
                              
                            `}</style>
                            <QuillNoSSRWrapper
                              modules={modules}
                              placeholder='Compose here'
                              value={value}
                              onChange={handleChange}
                              formats={formats}
                              theme="snow"
                            />
                            <button onClick={handleGenerateClick}>Generate</button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-zinc-900 bg-opacity-90 px-5 py-5 mb-4 h-full w-full max-w-10/12 rounded-lg text-center border-2 border-green-600 border-opacity-20">
                        <div className="text-left">
                            <ul>
                              {objects.map(obj => (
                                <li key={obj.id}>
                                  <div>{parse(obj.data)}</div>
                                  <button onClick={() => handleDeleteClick(obj.id)}>Delete</button>
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