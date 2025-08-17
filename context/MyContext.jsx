import React, {createContext, useState,useContext } from 'react'


export const overallContext=createContext();
// here u are creating the context using createContext hook. and in aother components u will use the context using useContext hook

export const MyContext = ({children}) => 
{

const [prompt,setPrompt] = useState("")   //will have the given input as prompt.
const [input,setInput]=useState("")       // symbolizes the input given from the input element

const [recentPrompt,setRecentPrompt]=useState("")   
// stores the typed input at the top of the mainSection

const [previousPrompts,setPreviousPrompts]=useState(JSON.parse(localStorage.getItem("previousPrompts"))||[])
//stores the previous inputs in the sideBar

const [showResult,setShowResult]=useState(false)
// with this, we can show the result in mainSection if its true. if it is false, default view of the mainSection will be shown


 const exportValues={
    prompt,setPrompt,input,setInput,recentPrompt,setRecentPrompt,previousPrompts,setPreviousPrompts,showResult,setShowResult
 }


  return (
    <overallContext.Provider value={exportValues}>
        {children}
    </overallContext.Provider>
  )
}
