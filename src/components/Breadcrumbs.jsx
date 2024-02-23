"use client"
import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function Breadcrumbs() {
    const pathNames = usePathname().split('/').filter(path => path && path != 'album')
    const userId = useSearchParams().get('userId')

    return (
        <ul className='breadcrumbs'>
            <li>
                <a href="/">Home </a>
            </li>
            {
                pathNames.map((key, index) => <li key={index}>
                    {
                        index < pathNames.length - 1 ?
                            <Link href={`${index === 0 ? '/album/' + key + '?userId=' + userId : key}`}> &nbsp;/ {key.replaceAll('_', ' ')}</Link>
                            : <span className='last_link'>&nbsp;/ {key.replaceAll('_', ' ')}</span>
                    }

                </li>)
            }
        </ul>
    )
}

export default Breadcrumbs