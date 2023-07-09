/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const BasicBreadcrumb = ({ pageName }) => {
    return (
        <>
            <h2>{pageName}</h2>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">{pageName}</li>
                </ol>
            </nav>
        </>
    )
}

export default BasicBreadcrumb