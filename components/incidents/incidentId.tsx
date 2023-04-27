import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from 'next/router'

import Layout from "@/components/layout/layout"

import IncidentLink from "./incidentLink";
import DeleteButton from "./deleteButton";

import useFetchLinks from "@/hooks/incidents/useFetchLinks";
import useFetchObjects from "@/hooks/incidents/useFetchObjects";

import handleAddObject from "@/pages/api/incidents/handleAddObject";
import handleDeleteObject from "@/pages/api/incidents/handleDeleteObject";

import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import Head from "next/head";


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


interface Link {
  id: string;
  name: string;
  url: string;
}

interface CurrentUser {
  id: string;
}


const IncidentElement: NextPage = () => {

  const [admin] = useState(true);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const [links, setLinks] = useState<Link[]>([]);
  
  const [value, setValue] = useState('');
  const [objects, setObjects] = useState<ObjectData[]>([]);


  const router = useRouter();
  const { incidentId } = router.query;


  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch('/api/current');
      const data = await response.json();
      setCurrentUser(data);
    };
    fetchCurrentUser();
  }, []);

  useFetchLinks(currentUser, setLinks);

  useFetchObjects(currentUser, incidentId, setObjects);
  

  const handleGenerateClick = () => {
    handleAddObject(currentUser, incidentId, value, setObjects).catch(error => console.error(error));
    setValue("");
  };

  const handleDeleteClick = (objectId: string) => {
    handleDeleteObject(currentUser, incidentId, objectId, setObjects);
  };
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  
  

  return (
    <>
        <Head>
          <title>Zgłoszenia - {incidentId}</title>
        </Head>
        <Layout>
            <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
            <div className="flex-wrap justify-center top-[8rem] absolute left-[2rem] w-11/12 ">
                <div className="flex flex-row gap-28 w-full ">

                    <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 w-full  max-w-[15rem] h-fit min-h-[47rem]  rounded-lg  border-2 border-green-600 border-opacity-20">
                      <div >
                        {links.map((link) => (
                          <ul key={link.id}>
                            <IncidentLink url={link.url} label={link.name}/>
                          </ul>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col w-full h-full">
                      {admin &&
                      <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 mb-4  h-fit max-w-10/12 rounded-lg text-center border-2 border-green-600 border-opacity-20 w-full">
                        <div>
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
                              placeholder='Napisz tutaj...'
                              value={value}
                              onChange={handleChange}
                              formats={formats}
                              theme="snow"
                              className="bg-white max-w-[85rem]"
                            />
                            </div>
                            <div className="pt-1">
                              <button className="bg-green-700 w-full h-[3rem] text-white rounded-[0.25rem]" onClick={handleGenerateClick}>Utwórz notatkę</button>
                            </div>
                        </div>
                      </div>
                      }
                      {objects.length > 0  &&
                      <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 mb-4  h-fit w-full max-w-[90rem] rounded-lg text-center border-2 border-green-600 border-opacity-20">
                        <div className=" bg-white w-full h-fit rounded-[0.25rem] py-2">
                            <ul >
                              {objects.map(obj => (
                                <li key={obj.id} className="px-2 py-2">
                                  <div className="flex flex-row w-full">
                                    <div className="text-left">{parse(obj.data)}</div>
                                    {admin && <DeleteButton size="30" classes="flex absolute right-8" color="black" onClick={() => handleDeleteClick(obj.id)} />}
                                  </div>
                                </li>
                              ))}
                            </ul>
                        </div>
                      </div>
                      }
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )

}
  
export default IncidentElement