import { driver } from '@prisma/client'
import React, { Fragment } from 'react'
import LostData from './LostData'
import DriverCard from './DriverCard'

type Props = {
    drivers: driver[]
}

export default function DriverGrid({ drivers }: Props) {
    if (!drivers || !drivers.length) return <LostData />
    return (
        <div className='mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
            {drivers.map(i => (
                <Fragment
                    key={i.id}
                >
                    <DriverCard {...i} />
                </Fragment>
            ))}
        </div>
    )
}