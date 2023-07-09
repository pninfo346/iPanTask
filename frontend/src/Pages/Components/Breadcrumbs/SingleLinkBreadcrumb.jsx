/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const SingleLinkBreadcrumb = ({ pageName, parent, url }) => {
    return (
        <>
            <h2>{pageName}</h2>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={url} className='text-decoration-none text-theme'>{parent}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{pageName}</li>
                </ol>
            </nav>
        </>
    )
}

export default SingleLinkBreadcrumb