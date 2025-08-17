import "./SideBar.css"
import {assets} from "../assets/assets"
import {useContext, useState} from "react"
import { overallContext } from "../../context/MyContext"
import { GeminiApiFetchHook } from "../../hooks/GeminiApiFetchHook"

export const SideBar = () => 
{
    const { prompt,setPrompt,input,setInput,recentPrompt,setRecentPrompt,previousPrompts,setPreviousPrompts,showResult,setShowResult} = useContext(overallContext)

    const {loading,setLoading,main,text,setText} =GeminiApiFetchHook(prompt)

/*Here when we click the menu icon (extension=true), every text in the sideBar should become null, but the icons must be visible. else the text must be visible with icons (extension=false). and also when the (extension=false the whole recent section should be null) 

this is done after creating the base UI for the sideBar*/

  const [extension,setExtension] =useState(false)
  return (
    <div className='sideBar'>
{/*In top we will have menu_icon, (the plus icon with New Chat) and finally Recent and since it is we are developing ui we have given placeholder recent task  */}

        <div className='top'>

            <img onClick={()=>setExtension(prev=>!prev)} className='menu' src={assets.menu_icon} alt="menu_icon"/>
{/*here we have used prev (representing the previous state value of the variable (extension). we are just setting the extension's previous value to its opposite) . if our previous value of extension is false then we are setting it to true and vice-versa. Note, u can give whatever name u want in place of prev */}

            <div className='new-chat' onClick={()=>setShowResult(false)}>
                <img src={assets.plus_icon} alt="newChat_icon"/>
                {extension?<p>New Chat</p>:null}
            </div>

            {extension?<div className='recent'>
                <p className='recent-title'>Recent</p> 
                    {
                    previousPrompts && previousPrompts.map((recent,index)=>
                    {
                        console.log(recent)

                        return(
                            <div onClick={()=>(setPrompt(recent))} key={index} className='recent-entry'>
                            <img src={assets.message_icon} alt="message-icon"/>
                            <p>{`${recent.slice(0,20)}....`}</p> 
                            {/*used slice to get characters from 0 to 20 */}
                            </div>        
                        )
                      
                    })}
                    
                    
                
            </div>:null}

        </div>

{/*In bottom we will have help, activity and settings */}
        <div className='bottom'>

 {/*Help icon */}     
            <div className='bottom-item recent-entry'>
                <img src={assets.question_icon} alt="question-icon"/>
                {extension?<p>Help</p>:null}
            </div>

 {/*history icon */}  
            <div className='bottom-item recent-entry'>
                <img src={assets.history_icon} alt="history-icon"/>
                {extension?<p>My Activity</p>:null}
            </div>

{/*Settings icon */}
            <div className='bottom-item recent-entry'>
                <img src={assets.setting_icon} alt="setting-icon"/>
                {extension?<p>Settings</p>:null}
            </div>
        </div>
    </div>
  )
}
