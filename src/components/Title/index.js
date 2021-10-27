import React from 'react'
import './title.css'

export default function Title(props) {
    return (
        <div className="title">
            {props.children}
            <span>{props.name}</span>            
        </div>
    )
}
