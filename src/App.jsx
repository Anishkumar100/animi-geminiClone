import React from 'react'
// we aint using App.css we will be using index.css for universal styling 
import { SideBar } from './components/SideBar'
import { MainSection } from './components/MainSection'
import {MyContext} from "../context/MyContext.jsx"


export const App = () => {
  return (
    <>
    <MyContext>
       <SideBar/>
       <MainSection/>
    </MyContext>

    </>
  )
}
