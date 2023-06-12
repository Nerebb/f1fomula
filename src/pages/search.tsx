import DriverGrid from '@/components/DriverGrid'
import MainLayout from '@/layout/MainLayout'
import { driverSearchValidate } from '@/utils/schemaValidate'
import { driver } from '@prisma/client'
import { getDrivers } from './api/driver'


export default function search({ ...data }: any) {
    const drivers: driver[] = data ? JSON.parse(data.data) : undefined

    return (
        <MainLayout
            tabTitle='F1 Formula: Search Drivers'
        >
            <DriverGrid drivers={drivers} />
        </MainLayout>
    )
}

export async function getServerSideProps(context: any) {
    let res;
    try {
        const validated = await driverSearchValidate.validate(context.query)
        res = await getDrivers(validated)
    } catch (error) {
        res = await getDrivers({})
    }
    const data = JSON.stringify(res)
    return { props: { data } }
}