import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import { IconContext } from 'react-icons'

import logo from '../../assets/images/logo.png'
import sidebar_items from '../../assets/JsonData/sidebar_routes.json'

const SidebarItem = (props) => {
  const active = props.active ? 'active' : ''

  return (
    <div className='sidebar_item'>
      <div className={`sidebar_item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  )
}
{
  /*
const Sidebar = (props) => {
  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
  const [isExpanded, setIsExpanded] = React.useState(
    sidebarCollapsed ? false : true
  )
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  )
  return (
    <div className={isExpanded ? 'sidebar' : 'sidebar collapsed'}>
      <div className='sidebar_logo'>
        <img src={logo} alt='company logo' />
      </div>

      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  )
}
*/
}

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false)
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  )

  const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {sidebar_items.map((item, index) => (
              <Link to={item.route} key={index}>
                <SidebarItem
                  title={item.display_name}
                  icon={item.icon}
                  active={index === activeItem}
                />
              </Link>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar
