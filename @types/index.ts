import { driver } from "@prisma/client"

export type driverSearch = {
    id?: string | string[]
    name?: string
    position?: number
    points?: number
    team?: string
    country?: string
}

export type CrawledDriver = Partial<Omit<driver, 'id' | 'bio' | 'points' | 'totalPoints'>> & {
    name: string,
    url: string,
    bio?: string[]
    points?: number
    totalPoints?: number
}