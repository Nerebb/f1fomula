import ChartByPoints from '@/components/ChartByPoints'
import DriverGrid from '@/components/DriverGrid'
import MainLayout from '@/layout/MainLayout'
import { Inter } from '@next/font/google'
import { driver } from '@prisma/client'
import { getDrivers } from './api/driver'
import Section from '@/layout/Section'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ ...data }: any) {
  const drivers: driver[] = data ? JSON.parse(data.data) : undefined

  return (
    <MainLayout
      tabTitle='F1 Drivers 2023'
    >
      {/* ChartByPoints */}
      <Section title={'Chart by Driver\'s points'}>
        <div className='mx-auto' id='ChartByPoints'>
          <ChartByPoints drivers={drivers} />
        </div>
      </Section>
      {/* DriverList */}
      <Section title='List of all drivers'>
        <DriverGrid drivers={drivers} />
      </Section>
    </MainLayout>
  )
}

export async function getServerSideProps(context: any) {
  const res = await getDrivers({})
  const data = JSON.stringify(res)
  return { props: { data } }
}