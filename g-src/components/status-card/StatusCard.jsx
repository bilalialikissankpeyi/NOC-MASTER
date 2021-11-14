import React from 'react'
import './statusCard.css'


const StatusCard = props => {
    return (
        <div className='status_card'>
            <div className='status_card_icon'>
              <i className={props.icon}></i>
            </div>
            <div className='status_card_info'>
             <h4>{props.count}</h4>
             <span>{props.title}</span>
            </div>
        </div>
    )
}

export default StatusCard
