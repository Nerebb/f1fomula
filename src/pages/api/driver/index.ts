// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, driver } from '@prisma/client'
import { driverSearch } from '@types'
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '@/utils/prismaClient'
import { driverSearchValidate, stringFilter } from '@/utils/schemaValidate'

type Data = {
    data?: driver[]
    message?: string
}

export async function getDrivers(props: driverSearch) {
    let searchParams: Prisma.driverWhereInput = {
        id: { in: props.id },
        name: { contains: props.name },
        position: { lte: props.position },
        points: { gte: props.points },
        team: { contains: props.team },
        country: { contains: props.country },
    }

    if (props.position || props.points) {
        searchParams
    }

    const res = await prismaClient.driver.findMany({
        where: searchParams
    })
    return res
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "GET":
            try {
                const validated = await driverSearchValidate.validate(req.query, { stripUnknown: true })
                const data = await getDrivers(validated)
                return res.status(200).json({ data })
            } catch (error: any) {
                return res.status(400).json({ message: error.message || "Unknown GetDrivers Error" })
            }
        default:
            return res.status(405).json({ message: "Invalid method" })
    }
}
