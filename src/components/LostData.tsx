import Link from 'next/link'
import React from 'react'

type Props = {}

export default function LostData({ }: Props) {
    return (
        <article className='flex flex-col items-center'>
            <p className='text-lg font-semibold dark:text-white'>Some thing went wrong! Cannot load data</p>
            <Link
                href={'/'}
                className='underline text-primary-300 hover:text-primary-500'
            >
                Return to home
            </Link>
        </article>
    )
}