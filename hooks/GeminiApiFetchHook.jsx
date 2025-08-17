import React, { useCallback, useEffect, useState,useContext } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";

import { overallContext } from '../context/MyContext';


    

export const GeminiApiFetchHook = (prompt) => {

    const delayPara=(index,newWord)=>
    {
        setTimeout(()=>
        {
            setText(newWord)

        },50 * index)
    }
 
    const [loading,setLoading]=useState(false)
    const [text,setText]=useState("")

    const genAI = new GoogleGenerativeAI( "AIzaSyAvlKS-uYd8bArzm05Z5rtgYkbOHvB7KA4");

    const { setPrompt,input,setInput,recentPrompt,setRecentPrompt,previousPrompts,setPreviousPrompts,showResult,setShowResult} = useContext(overallContext)
// i have taken out prompt since i have already given it as parameter
    




    const main=useCallback(async (prompt) =>
    {
      
        try 
        {
              
            if(prompt!=="")
            {   
                   
                setLoading(true)
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                setShowResult(true)
                setRecentPrompt(prompt)
        
              const result = await model.generateContent(prompt);           
              setLoading(false)
              setPreviousPrompts(prev=>
              {
                if(!prev.includes(prompt))
                {
                    const updatedPreviousPrompts=[...prev,prompt]
                   localStorage.setItem("previousPrompts",JSON.stringify([...prev,prompt]))
                   return updatedPreviousPrompts
                }
                else
                {
                   localStorage.setItem("previousPrompts",JSON.stringify([...prev]))
                   return prev

                }

              }
                )//for sideBar to display recent prompts
              /* initially the recentPrompts is created as an array. here, we have to override the array, not update it using push() . That's why we are copying all the values in the prev array and adding it in a new array with input as a value with a particular index */
              const finalText=await result.response.candidates[0].content.parts[0].text;
      

              let responseArray=finalText.split("**")// splitting the text (response from api)
              console.log(responseArray)
              let newResponse ="";
              for(let i=0;i<responseArray.length;i++)
              {
                  if(i%2===0)
                  {
                   newResponse+=`${responseArray[i]}`
                  }
                  else
                  {
                      newResponse+=`<br/><br/><b>${responseArray[i]}</b><br/>`

                  }
              }
              let newModifiedResponse=newResponse.split("*").join("")
// here u might have a doubt, wether the newResponse is an array or not. the answer is simple, newResponse is not an array its a string. we have initialized it as a string, so it appends values in the string. so, we are splitting the string to an array and joining it back again
              console.log(newModifiedResponse)
              let finalResponseArray=newModifiedResponse.split(" ")
              let newWord=""
              for(let i=0;i<finalResponseArray.length;i++)
              {
                newWord += finalResponseArray[i]  + " "
                delayPara(i,newWord)
              }
          
              setInput("")
       
              
            }
            
             
            }
            
        catch (Error) 
        {
            console.log(Error.message)
        }
        
    },[prompt])
     
    useEffect(()=>
    {
        
        main(prompt)
        
        
    },[main,prompt])
    

    //and also, we are going to modify the text slightly. u can see ** in place of bold thus, in that particular areas we are going to give bold tags. also, we are modifying the text in terms of *, empty spaces " "


    return {text,setText,loading,main}
}
