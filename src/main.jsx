import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.jsx'

createRoot(document.getElementById('root')).render(
 
    <App />

)

/*
look at the assests.js file its smart ra machi!!

so, we have like a lot of assets we are importing everything in a single file and exporting all of them. So, to use all the assets, we just have to import that one file, and we can use it
*/


