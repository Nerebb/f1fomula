// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, driver } from '@prisma/client'
import { driverSearch } from '@types'
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '@/utils/prismaClient'
import { driverSearchValidate, isUUID, stringFilter } from '@/utils/schemaValidate'



type Data = {
    data?: driver
    message?: string
}

export async function getDriver(id: string) {
    const res = await prismaClient.driver.findFirstOrThrow({
        where: { id }
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
                const validated = await isUUID.required().validate(req.query.id)
                const data = await getDriver(validated)
                return res.status(200).json({ data })
            } catch (error: any) {
                return res.status(400).json({ message: error.message || "Unknown GetDriver Error" })
            }
        default:
            return res.status(405).json({ message: "Invalid method" })
    }
}
