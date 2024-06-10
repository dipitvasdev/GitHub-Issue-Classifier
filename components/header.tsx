import React from 'react'
import { AiOutlineIssuesClose } from 'react-icons/ai'
import { SiDatabricks } from 'react-icons/si'

export default function Header() {
    const isDatabricksAvailable = process.env.REACT_APP_DATABRICKS_AVAILABLE as string
    return (
        <div className={`flex flex-col items-center justify-center gap-4 ${+!isDatabricksAvailable ? 'mt-32' : 'mt-16 sm:mt-22'}`}>
            <h1 className="text-3xl font-bold capitalize flex flex-row items-center justify-center"><AiOutlineIssuesClose className='mr-2' /> GitHub Issue Classifier</h1>
            <p className="font-light text-sm capitalize flex flex-row items-center justify-center"> <SiDatabricks className='mr-2' />Model trained on Databricks (GCP Compute).</p>
        </div>
    )
}
