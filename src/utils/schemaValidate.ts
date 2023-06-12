import { Prisma } from '@prisma/client'
import { CrawledDriver, driverSearch } from '@types'
import * as Yup from 'yup'

export const stringFilter: Array<keyof Prisma.StringFilter> = [
    "equals",
    "in",
    "notIn",
    "lt",
    "lte",
    "gt",
    "gte",
    "contains",
    "startsWith",
    "endsWith",
    "not",
]

const intFilter = [

]

export const isUUID: Yup.StringSchema<string | undefined> = Yup.string().uuid()

export const driverValidate: Yup.ObjectSchema<CrawledDriver> = Yup.object({
    name: Yup.string().max(50).required(),
    url: Yup.string().max(100).required(),
    position: Yup.number().integer().min(0).max(255),
    points: Yup.number().min(0).max(65535),
    team: Yup.string().max(100),
    image: Yup.string(),
    country: Yup.string().max(100),
    podiums: Yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
    totalPoints: Yup.number().min(0).max(65535),
    grandsPrixEntered: Yup.number().integer().min(0).max(65535),
    worldChampionships: Yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
    highestRaceFinish: Yup.string().min(0).max(10),
    highestGridPosition: Yup.number().min(0).max(255),
    dateOfBirth: Yup.date(),
    placeOfBirth: Yup.string().max(100),
    bio: Yup.array().of(Yup.string().required()),
})

export const driverSearchValidate: Yup.ObjectSchema<driverSearch> = Yup.object({
    id: Yup.string().uuid(),
    name: Yup.string().max(50),
    position: Yup.number().integer().min(0).max(255),
    points: Yup.number().integer().min(0).max(65535),
    team: Yup.string().max(100),
    country: Yup.string().max(255),
})
