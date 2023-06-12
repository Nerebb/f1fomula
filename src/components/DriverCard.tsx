import { driver } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import Chip from './Chip'

export default function DriverCard(driver: driver) {

    return (
        <article
            id={driver.name}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <Image className="rounded-t-lg" alt={driver.name} src={driver.image || '/lost-avatar.png'} width={400} height={400} />
            <div className="p-5">
                <div className='flex items-end justify-between'>
                    <div className="mb-2 text-2xl capitalize font-bold tracking-tight text-gray-900 dark:text-white">{driver.name}</div>
                    <div className="mb-3 font-normal capitalize text-gray-700 dark:text-gray-400">
                        {driver.country}
                    </div>
                </div>
                <div className='flex flex-wrap gap-2'>
                    <Chip>
                        <Fragment>
                            <span className='font-bold'>Rank: </span>
                            <span className='mb-3 font-normal capitalize text-gray-700 dark:text-gray-400'>{driver.position}</span>
                        </Fragment>
                    </Chip>
                    <Chip>
                        <Fragment>
                            <span className='font-bold'>Points: </span>
                            <span className='mb-3 font-normal capitalize text-gray-700 dark:text-gray-400'>{Number(driver.points)} </span>
                        </Fragment>
                    </Chip>
                    <Chip>
                        <Fragment>
                            <span className='hidden xl:inline-block font-bold'>Team:</span>
                            <span className='mb-3 font-normal capitalize text-gray-700 dark:text-gray-400'> {driver.team}</span>
                        </Fragment>
                    </Chip>
                </div>
                <Link
                    href={`/${driver.id}`}
                    className="inline-flex mt-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Read more
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
            </div>
        </article>
    )
}