import Layout from "@/components/layout/layout"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import NoteLink from "@/components/notes/noteLink"

import {VscLoading} from 'react-icons/vsc'

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

import useFetchLinks from "@/hooks/notes/useFetchLinks"

import { NextPage } from "next"



const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: { matchVisual: false }
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
  id: string
  name: string
  url: string
}

interface CurrentUser {
  id: string
}



const NotesLoadingPage: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [value, setValue] = useState('')

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch('/api/current')
      const data = await response.json()
      setCurrentUser(data)
    }
    fetchCurrentUser()
  }, [])

  useFetchLinks(currentUser, setLinks)

  return (
    <>
        <Layout>
            <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
            <div className="flex-wrap justify-center top-[8rem] absolute left-[2rem] w-11/12 ">
                <div className="flex flex-row gap-28 w-full ">

                    <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 w-full  max-w-[15rem] h-fit min-h-[47rem]  rounded-lg  border-2 border-green-600 border-opacity-20">
                      <div >
                        {links.map((link) => (
                          <ul key={link.id}>
                            <NoteLink url={link.url} label={link.name}/>
                          </ul>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col w-full h-full">
                      <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 mb-4  h-fit max-w-10/12 rounded-lg text-center border-2 border-green-600 border-opacity-20 w-full">
                        
                        
                        <div >
                          
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
                              formats={formats}
                              theme="snow"
                              className="bg-white max-w-[85rem]"
                            />
                            
                            </div>
                            <div className="pt-1">
                              <button className="bg-green-700 w-full h-[3rem] text-white rounded-[0.25rem]">Utwórz notatkę</button>
                            </div>
                              
                        </div>
                    </div>
                    <div>
                        <p className="text-white pt-[5rem] flex justify-center "><VscLoading className="animate-spin" size={50}/></p>
                    </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  )

}
  
export default NotesLoadingPage