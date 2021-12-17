import React from 'react'

import Sidebar from '../sidebar/Sidebar'
import Topnav from '../topnav/Topnav'
import Routes from '../layout/Routes'
import './layout.css'

import { BrowserRouter,Route } from 'react-router-dom'

const Layout = () => {
    return (
        <BrowserRouter>
            <Route render={(props) => (
               
               <div className='layout'>
               <Sidebar {...props}/>
               <div className="layout_content">
               <Topnav/>
                 <div className="layout_content_main">
                   <Routes/>
                 </div>
               </div>
               </div>
            )}/>
        </BrowserRouter>
    )
}

export default Layout
