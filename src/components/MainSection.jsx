import React from 'react'
import {assets} from "../assets/assets"
import "./MainSection.css"
import { useContext } from 'react'
import {overallContext} from "../../context/MyContext.jsx"
import { GeminiApiFetchHook } from '../../hooks/GeminiApiFetchHook.jsx'


export const MainSection = () => 
{

  const { prompt,setPrompt,input,setInput,recentPrompt,setRecentPrompt,previousPrompts,setPreviousPrompts,showResult,setShowResult} = useContext(overallContext)

  // showResult is to show the response in the mainSection overriding the cards. if it is true then, the answer for the prompt is generated. and if false u know what it is

  //recentPrompt will represent the prompts which are in the sideBar.so, while keeping the showResult=true, it is neccessary u have to pass the input or prompt to the setRecentPrompt

  const {text,setText,loading,main}=GeminiApiFetchHook(prompt)

  return (
    <div className='main'>

{/*here the navBar is declared */}
      <div className="nav">
        <p>Animi</p>
        <img src={assets.user_icon} alt="userImage"/>
      </div>

      <div className="main-container">

{/*Acts as the main welcome part */}
{/*here, u will experience a silly mistake, in the context file, always remember if or ? executes only true statements.  */}
        {!showResult?<><div className="greet">
          <p><span>வணக்கம் அனிஷ்</span></p>
          <p>How Can I Help U Today?</p>
        </div>


        <div className="cards">
{/*These are the 4 cards */}
          <div onClick={()=>{const question = "Write a comprehensive profile about Anish Kumar, a skilled full stack web developer. Include detailed information about his proficiency in HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and other modern web technologies. Describe his development journey, the types of client projects he has handled, and how his technical expertise has evolved over time. The tone should be professional and informative.";setPrompt(question)}} className="card">
            <p >Write a comprehensive profile about Anish Kumar, a skilled full stack web developer. Include detailed information about his proficiency in HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and other modern web technologies. Describe his development journey, the types of client projects he has handled, and how his technical expertise has evolved over time. The tone should be professional and informative.</p>
            <img src={assets.compass_icon} alt="compass_icon"/>
          </div>

          <div onClick={()=>{
            const question ="Describe Anish Kumar’s entrepreneurial journey as the co-founder of Spark Solutions, a student-led MSME-registered student organization. Explain how Spark Solutions was founded, its official website (https://sparksolution.org), the inspiration behind it, its mission, and the kind of impact it's creating through web solutions, student projects, and tech services. The tone should be professional and visionary."
            setPrompt(question)}} className="card">
            <p>Describe Anish Kumar’s journey as the co-founder of Spark Solutions, a MSME-registered student organization. Explain how Spark Solutions was founded, its official website (https://sparksolution.org), the inspiration behind it, its mission, and the kind of impact it's creating through web solutions, student projects, and tech services. The tone should be professional and visionary.

</p>
            <img src={assets.bulb_icon} alt="compass_icon"/>
          </div>

          <div onClick={()=>{
            const question="Write about the personality of Anish Kumar, focusing on his leadership qualities. Highlight how he is a born leader, highly motivated, innovative, goal-oriented, and team-driven. Describe how these characteristics have contributed to both his personal and professional growth. The tone should be inspiring and reflective." 
            setPrompt(question)}} className="card">
            <p>Write about the personality of Anish Kumar, focusing on his leadership qualities. Highlight how he is a born leader, highly motivated, innovative, goal-oriented, and team-driven. Describe how these characteristics have contributed to both his personal and professional growth. The tone should be inspiring and reflective.</p>
            <img src={assets.message_icon} alt="compass_icon"/>
          </div>

          <div onClick={()=>{
            const question="Provide a well-written paragraph on the hobbies and personal interests of Anish Kumar. Include his passion for playing games, cricket, and other activities that contribute to his creativity and well-being. Explain how these interests balance his work life and shape his unique perspective as a developer and entrepreneur. The tone should be relaxed yet professional."
            setPrompt(question)}} className="card">
            <p>
            Provide a well-written paragraph on the hobbies and personal interests of Anish Kumar. Include his passion for playing games, cricket, and other activities that contribute to his creativity and well-being. Explain how these interests balance his work life and shape his unique perspective as a developer and entrepreneur. The tone should be relaxed yet professional.
</p>
            <img src={assets.code_icon} alt="compass_icon"/>
          </div>
        </div></>
        :
        
        <div className='result'>
          <div className="result-title">
            <img src={assets.user_icon} alt="The Batman"/>
            <p>{recentPrompt}</p>{/*to showcase ur prompt */}
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="Gemini-icon"/>

            {loading?<>
            <div className='loader'>
              <p>Patience is the key!! wait for animi's best answers</p>
              <hr/>
              <hr/>
              <hr/>
            </div></>:
          <p onLoad={()=>delayPara()} dangerouslySetInnerHTML={{__html:text}}/>
         
           }
           
{/*this property in <p> is used to get all the tags present inside the <p> element. and it must be displayed only when loading is false */}
            
          </div>
        </div>
      }

{/*The input box  */}
<br/><br/>
        <div className="main-bottom"> 
          <div className="search-box">
            <input onChange={(event)=>setInput(event.target.value)} value={input} type="text" placeholder='Enter some prompt'/>
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={()=>main(input)} src={assets.send_icon } alt="" />:""}
            </div>
          </div>
{/*Acts as a footer */}
          <p className='bottom-info'>
            Animi is 99.99% accurate but, if u find any information accurate verify it with other sources.
          </p>
        </div>
      </div>

    </div>
  )
}
