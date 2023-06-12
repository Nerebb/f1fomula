import React, { PropsWithChildren } from 'react'

type Props = {
    title: string
}

export default function Section({ title, children }: PropsWithChildren<Props>) {
    return (
        <section className='my-5 space-y-5'>
            <h1 className='font-bold text-3xl text-center dark:text-white'>{title}</h1>
            {children}
        </section>
    )
}