import React, { useEffect, useState } from "react"
import Layout from "../layout/layout"
import BackgroundInput from "./backgroundInput"

import BackgroundSubmitButton from "./backgroundSubmitButton"
import BackgroundDescription from "./backgroundDescription"

import { updateBackgroundImageUrl } from "@/pages/api/background/setBackground"

interface CurrentUser {
  id: string
}

const Background = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("")
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch('/api/current')
      const data = await response.json()
      setCurrentUser(data)
    }
    fetchCurrentUser()
  }, [])

  const handleBackgroundImageChange = (event:any) => {
    setBackgroundImageUrl(event.target.value)
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault()

    try {
      await updateBackgroundImageUrl(currentUser?.id, backgroundImageUrl)
      window.location.reload()
    } catch (error) {
      console.error("Błąd w pobraniu URL", error)
    }
  }

  return (
    <>
      <Layout>
        <div className="flex justify-center">
            <div className="bg-neutral-600 bg-opacity-20 px-5 py-5 top-[6rem] absolute lg:2/5  rounded-lg min-w-[45rem] w-fit flex justify-center border-2 border-green-600 border-opacity-20">
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div>
                      <BackgroundInput type="text" value={backgroundImageUrl} onChange={handleBackgroundImageChange} label="Wprowadź adres URL"/>
                    </div>
                    <div>
                      <BackgroundSubmitButton label="Zmień tło" />
                    </div>
                  </div>  
                </form>
                <BackgroundDescription />
              </div>
            </div>
        </div>
      </Layout>
    </>
  )
}

export default Background