import Layout from "../layout/layout"
import React from 'react'

import NotesComponent from "./flip/notes/notesComponent"

import IncidentsComponent from "./flip/incidents/incidentsComponent"
import InsetsComponent from "./flip/insets/insetsComponent"
import VpnComponent from "./flip/vpn/vpnComponent"

const HomeComponent = () => {

    

    return (
        <>
            <Layout>
                <img src='/images/black_fade.webp' alt='Logo' className="w-full h-[18rem] absolute top-[42rem] opacity-90"/>
                <div className="flex pt-40 justify-center">
                    <div className="flex flex-col w-full h-full gap-12">
                        <div className="flex gap-12 justify-center">
                            <div className="px-2 py-2 w-1/5 h-[18rem] flex flex-row gap-3 ">
                                <NotesComponent/>
                            </div>
                            <div className="px-2 py-2 w-1/5 h-[18rem] flex flex-row gap-3 ">
                                <IncidentsComponent/>
                            </div>
                        </div>
                        <div className="flex gap-12 justify-center">
                            <div className="px-2 py-2 w-1/5 h-[18rem] flex flex-row gap-3 ">
                                <InsetsComponent/>
                            </div>
                            <div className="px-2 py-2 w-1/5 h-[18rem] flex flex-row gap-3 ">
                                <VpnComponent/>
                            </div>
                        </div>
                    </div>
                </div> 
            </Layout>  
        </>
    )
}

export default HomeComponent