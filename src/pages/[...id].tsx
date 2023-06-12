import LostData from '@/components/LostData'
import MainLayout from '@/layout/MainLayout'
import { isUUID } from '@/utils/schemaValidate'
import { driver } from '@prisma/client'
import { getDriver } from './api/driver/[id]'
import Image from 'next/image'
import { dateFnsFormat } from '@/utils/dateFns'
import { Locale } from 'date-fns'
import { Fragment, useEffect, useMemo, useState } from 'react'


export default function DriverDetail(data: any) {
    const driver: driver = data ? JSON.parse(data.data) : undefined
    const biography = Array.isArray(driver.bio) ? driver.bio as string[] : undefined

    return (
        <MainLayout tabTitle={driver?.name.toUpperCase() ?? "Page not found"}>
            {!driver ? <LostData /> : (
                <article className='space-y-5 py-5'>
                    {/* Image */}
                    <div className='flex space-x-5'>
                        <Image className="rounded-t-lg" alt={driver.name} src={driver.image || '/lost-avatar.png'} width={400} height={500} />
                        {/* GeneralInfo */}
                        <div className='grow flex flex-col'>
                            <h1 className='capitalize font-extrabold text-3xl dark:text-white'>{driver.name}</h1>
                            <table className='grow'>
                                <tbody>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>Team: </th>
                                        <td className='capitalize'>{driver.team ?? "Unknown"}</td>
                                    </tr>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>Country: </th>
                                        <td className='capitalize'>{driver.country ?? "Unknown"}</td>
                                    </tr>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>Podiums: </th>
                                        <td className='capitalize'>{driver.podiums ?? 'n/a'}</td>
                                    </tr>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>Total Points: </th>
                                        <td className='capitalize'>{Number(driver.totalPoints) ?? 'n/a'}</td>
                                    </tr>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>Grands Prix entered: </th>
                                        <td className='capitalize'>{driver.grandsPrixEntered ?? 'n/a'}</td>
                                    </tr>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>World Championships: </th>
                                        <td className='capitalize'>{driver.worldChampionships ?? 'n/a'}</td>
                                    </tr>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>Highest race finish: </th>
                                        <td className=''>{driver.highestRaceFinish ?? 'n/a'}</td>
                                    </tr>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>Highest grid position: </th>
                                        <td className='capitalize'>{driver.highestGridPosition ?? 'n/a'}</td>
                                    </tr>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>Date of birth: </th>
                                        <td className='capitalize'>{driver.dateOfBirth ? dateFnsFormat(driver.dateOfBirth, 'P') : 'n/a'}</td>
                                    </tr>
                                    <tr className="hover:bg-primary-50 dark:hover:bg-gray-700">
                                        <th className='text-left'>Place of birth: </th>
                                        <td className='capitalize'>{driver.placeOfBirth ?? 'Unknown'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Bio */}
                    {biography && <div className='mb-5 space-y-5'>
                        <h1 className='text-3xl font-bold'>Biography</h1>
                        <div className='space-y-5'>
                            {biography.map((i, idx) => (
                                <Fragment key={`bio-${idx}`}>
                                    <p>{i}</p>
                                </Fragment>
                            ))}
                        </div>
                    </div>}
                </article>
            )}
        </MainLayout>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const id = await isUUID.required().validate(context.query.id[0])
        const res = await getDriver(id)
        const data = JSON.stringify(res)
        return { props: { data } }
    } catch (error) {
        return { props: [] }
    }
}