import React, { useState, useEffect } from "react"
import Link from "next/link"
import Layout from "@/components/layout/layout"

import IncidentInput from "./incidentInput"
import IncidentButton from "./incidentButton"
import IncidentLink from "./incidentLink"
import DeleteButton from "./deleteButton"

import useFetchLinks from "@/hooks/incidents/useFetchLinks"
import handleAddLink from "@/pages/api/linksIncidents/handleAddLink"
import handleDeleteLink from "@/pages/api/linksIncidents/handleDeleteLink"


interface Link {
  id: string
  name: string
  url: string
}

interface CurrentUser {
  id: string
}


const IncidentsPageComponent = () => {

  const [admin] = useState(true)
  
  const [name, setName] = useState("")
  const [links, setLinks] = useState<Link[]>([])
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch('/api/current')
      const data = await response.json()
      setCurrentUser(data)
    };
    fetchCurrentUser()
  }, [])

  useFetchLinks(currentUser, setLinks)

  const handleAddLinkWrapper = () => {
    handleAddLink(currentUser, name, setLinks)
    setName("")
  };

  const handleDeleteLinkWrapper = (id: string) => {
    handleDeleteLink(id, currentUser, links, setLinks)
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
                            <IncidentLink url={link.url} label={link.name}/>
                            {admin && <DeleteButton size="20" classes="" color="white" onClick={() => handleDeleteLinkWrapper(link.id)} />}
                          </ul>
                        ))}
                      </div>
                    </div>
                    {admin &&
                    <div className="bg-zinc-600 bg-opacity-30 px-5 py-5 mb-4 h-full w-full max-w-10/12 rounded-lg text-center border-2 border-green-600 border-opacity-20">
                      <div>
                        <IncidentInput
                          type="text"
                          id="note"
                          value={name}
                          onChange={(event:any) => setName(event.target.value)}
                          label="Podaj nazwę folderu"
                        />
                        <IncidentButton onClick={handleAddLinkWrapper} label="Stwórz folder"/>
                      </div>
                    </div>
                    }
                </div>
            </div>
        </Layout>
    </>
  )

}
  
export default IncidentsPageComponent