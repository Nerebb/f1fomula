// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dateFnsFormat, dateFnsParse } from '@/utils/dateFns'
import prismaClient from '@/utils/prismaClient'
import { driverValidate } from '@/utils/schemaValidate'
import { toCamelCase } from '@/utils/toCamelCase'
import { Prisma } from '@prisma/client'
import { CrawledDriver } from '@types'
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

import { Page } from "puppeteer"

type Data = any
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "GET":
            const browser = await puppeteer.launch({
                headless: false,
            })

            const homePage = await browser.newPage()
            await homePage.goto('https://www.formula1.com/en/drivers.html', { waitUntil: 'networkidle2' })

            //if cookies then accept
            await homePage.$('button.trustarc-agree-btn').then(ele => ele?.click())

            const f1Drivers = await getDriverUrl(homePage)
            if (!f1Drivers || f1Drivers.length === 0) return res.status(400).json({ message: "No drivers found" })

            for (const driver of f1Drivers) {
                await homePage.goto(driver.url, { waitUntil: 'load' })

                //if modal then close
                await homePage.$('.evg-overlay button.evg-overlay-close').then(ele => ele?.click())

                //Due to page using LazyLoad - scroll to end then check all networks all fetched
                await autoScroll(homePage)
                await waitTillHTMLRendered(homePage) //CheckfullyLoaded


                try {
                    const detail = await driverDetail(homePage)

                    const validated = await driverValidate.validate({ ...driver, ...detail }, { stripUnknown: true })
                    await upsertDriver(validated)

                } catch (error) {
                    console.log("🚀 ~ file: f1formula.tsx:73 ~ error:", error)
                    continue;
                }
            }

            browser.close()
            return res.status(200).json("Connected")
        default:
            return res.status(405).json({ message: "Invalid method" });
    }
}

async function getDriverUrl(page: Page) {
    const listDrivers = await page.waitForSelector(".container.listing-items--wrapper.driver.during-season .row")

    const crawledDrivers = await listDrivers?.$$eval('a', element => element.map(driver => {
        const url = driver.href

        const position = Number(driver.querySelector("fieldset .rank")?.textContent) ?? undefined
        const points = Number(driver.querySelector('fieldset .points .f1-wide--s')?.textContent) ?? undefined

        return { url, position, points } satisfies Partial<CrawledDriver>
    }))

    return crawledDrivers
}

async function waitTillHTMLRendered(page: Page, timeout = 30000) {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;

    while (checkCounts++ <= maxChecks) {
        let html = await page.content();
        let currentHTMLSize = html.length;

        let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

        console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

        if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
            countStableSizeIterations++;
        else
            countStableSizeIterations = 0; //reset the counter

        if (countStableSizeIterations >= minStableSizeIterations) {
            console.log("Page rendered fully..");
            break;
        }

        lastHTMLSize = currentHTMLSize;
        await page.waitForTimeout(checkDurationMsecs);
    }
};

async function autoScroll(page: Page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve(() => { });
                }
            }, 100);
        });
    });
}

function santinizeDriver(object: Record<string, any>): Record<string, any> {
    let santinized: Record<string, any> = {};
    const keys = Object.keys(object)
    for (const key of keys) {
        const val = object[key]
        const santinizeKey = toCamelCase(key)

        if (santinizeKey === 'dateOfBirth') {
            const date = dateFnsParse(val)
            santinized['dateOfBirth'] = dateFnsFormat(date)
        } else if (santinizeKey === 'points') {
            santinized['totalPoints'] = val.toLowerCase()
        } else if (typeof val === "string") {
            santinized[santinizeKey] = val.toLowerCase()
        } else {
            santinized[santinizeKey] = val
        }
    }

    return santinized
}

async function driverDetail(page: Page) {
    const image = page.$eval('.profile figure .fom-adaptiveimage img', img => img.getAttribute('src')) ?? undefined

    const stats = page.$$eval('.stats .stat-list > tbody > tr', data => {
        let result: Record<string, any> = {};
        for (const ele of data) {
            if (!ele) continue
            const key = ele.querySelector("th.stat-key span")?.textContent ?? "unknown"
            const value = ele.querySelector("td.stat-value")?.textContent ?? undefined

            result[key] = value
        }
        return result
    })

    const bio = page.$$eval(".biography div.text.parbase:not(:first-child) > p", data => data.map(i => i.textContent?.replace(/\n/g, '')))

    const name = page.$eval("h1.driver-name", data => data.innerText)

    const response: Record<string, any> = await Promise
        .all([image, stats, bio, name])
        .then(data => ({
            image: data[0],
            ...data[1],
            bio: data[2],
            name: data[3],
        }))

    //Puppeteer do not support import functions from locals to their automated browser (chronium)
    //So i need to santinize the returned data after use $$eval as (documen.querySelector) to meet the database
    return santinizeDriver(response)
}

async function upsertDriver(driver: CrawledDriver) {
    const data = await prismaClient.driver.upsert({
        where: {
            name_url: {
                name: driver.name,
                url: driver.url
            }
        },
        create: {
            ...driver,
            points: driver.points ? new Prisma.Decimal(driver.points) : undefined,
            totalPoints: driver.totalPoints ? new Prisma.Decimal(driver.totalPoints) : undefined,
        },
        update: {
            ...driver,
            points: driver.points ? new Prisma.Decimal(driver.points) : undefined,
            totalPoints: driver.totalPoints ? new Prisma.Decimal(driver.totalPoints) : undefined,
        },
    })
    return data
}
