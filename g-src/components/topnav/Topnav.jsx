import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  buildDropContent,
  renderNotificationItem,
  contentNumber,
} from './DropContent'
import { useSelector, useDispatch } from 'react-redux'
import { loadData } from '../../reducers/searched'
import user_image from '../../assets/images/favicon.png'
import user_menu from '../../assets/JsonData/user_menus.json'
import './topnav.css'
import Table from '../table/Table'
import Dropdown from '../dropdown/dropdown'
import notifications from '../../assets/JsonData/notification.json'
import ThemeMenu from '../thememenu/ThemeMenu'

const curr_user = {
  display_name: 'Noc',
  image: user_image,
}

const renderUserToggle = (user) => (
  <div className='topnav_right_user'>
    <div className='topnav_right_user_image'>
      <img src={user.image} alt='' />
    </div>
    <div className='topnav_right_user_name'>{user.display_name}</div>
  </div>
)

const renderUserMenu = (item, index) => (
  <Link to='/' key={index}>
    <div className='notification-item'>
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
)

const Topnav = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.searched)
  return (
    <div className='topnav'>
      <div className='topnav_search'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={(e) => {
            if (e !== '') {
              dispatch(loadData(e.target.value))
            }
          }}
        />
        <i className='bx bx-search'></i>
      </div>
      <div className='topnav_right '>
        {!searchTerm ? (
          <div className='topnav_right-item'>
            <h3>No User Associated To The search</h3>
          </div>
        ) : (
          <>
            <div className='topnav_right-item'>
              <h3>Object Found {`${searchTerm.ObjectName}`}</h3>
            </div>
            <div className='topnav_right-item'>
              <Dropdown
                icon='bx bx-user'
                badge={contentNumber(searchTerm)}
                contentData={buildDropContent(searchTerm)}
                renderItems={(item, index) =>
                  renderNotificationItem(item, index)
                }
                renderFooter={() => <Link to=''>View All</Link>}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Topnav
