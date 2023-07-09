/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Button = ({ type, title }) => {
    return (
        <>
            <button type={type} className='btn btn-sm btn-custom'>{title}</button>
        </>
    )
}

export default Button