import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './route/index.jsx'
import { store } from './redux/store.js'





createRoot(document.getElementById('root')).render(

<Provider store={store}> 
     <RouterProvider router = {router} />
</Provider>

   
  
 
)
