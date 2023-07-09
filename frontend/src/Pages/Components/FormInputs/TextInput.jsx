/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const TextInput = ({ title, name, type, placeholder, value, onChange, required }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={name}>{title} {required == true ? <span className='text-danger fw-bold'>*</span> : ''}</label>
                <input 
                    type={type} 
                    id={name} 
                    name={name} 
                    value={value}
                    className='form-control' 
                    placeholder={placeholder} 
                    onChange={onChange}
                    required={required}
                />
            </div>
        </>
    )
}

export default TextInput