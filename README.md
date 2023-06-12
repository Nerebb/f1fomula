Welcome to the F1 Formula Drivers website, where we provide the latest updates on the drivers' status.

## TABLE OF CONTENT

- [About The Project](#about-the-project)
- [Build Stack](#build-with)
- [Getting started](#getting-started)
- [Road map](#roadmap)

## About The Project

### Build with

<img alt='NextJs' width='25px' style="filter: brightness(0) invert(1); padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg" />
<img alt="Prisma" width='22px' style="filter: brightness(0) invert(1); padding-right:10px;" src='./README/prisma_icon.png'>
<img alt="ChartJs" width='25px' style="padding-right:10px;" src='https://scicoding.com/content/images/2021/09/chartjs-logo-1.svg'>

<br/>
<br/>

- I chose Next.js as mine framework because it allows us to efficiently build a full-stack application. Since the project is not very large, Next.js Serverless is a suitable choice. Moreover, when deployed on Vercel, it supports [Cron Jobs](https://vercel.com/blog/cron-jobs) for automatic API requests at scheduled intervals.

- For web scraping, I use Puppeteer, which is easy to use and allows us to automate data extraction. The only downside is that it requires waiting for the page to fully load before retrieving the final data, which can be time-consuming. However, Puppeteer can scale by setting up multiple automated crawlers.

- I use Prisma with MySQL as the database solution. Since the data is not consistent, Prisma's ORM and SQL database will help ensure the purity of the scraped data.

### Pages

- [Home page](https://f1fomula.vercel.app/)
  - Users can view charts representing the drivers' points.
    ![Charts](/README/chartByPoints.png)
  - Clicking on a bar in the chart will navigate to the selected driver using the #hash in the URL. Clicking "Read more" will take users to the detailed page of that driver.
    ![DriverCard](/README/allDrivers.png)
- [Search page](https://f1fomula.vercel.app/search)
  - Users can search for drivers using the provided search bar and specified keys.
    ![SearchDrivers](/README/searchPage.png)
- [Detail page](https://f1fomula.vercel.app/0031176d-0554-45dc-a03b-6b69e91f7a40)
  - Users can view the complete details of a driver based on their ID.
    ![DetailDriver](/README/detailPage.png)

## Getting started

To set up the project, follow these steps:

1. Install the required dependencies using npm:

```sh
npm install
```

2. Enviroments

The project requires the following environment variables, defined in [env.d.ts](/next-env.d.ts):

- DATABASE_URL: The MySQL URL used by Prisma to connect to the database. For more information, refer to the Prisma documentation.[For more info](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale#connecting-your-database)
- NEXT_PUBLIC_BASE_URL: The production build URL used to configure href attributes.

3. Database setup

- Run the following commands to generate the necessary schema and client for Prisma:

```sh
    npx prisma db push
    npx prisma generate client
```

- [prisma db push](/prisma/schema.prisma) generate configured schema into MySQL tables.
- [prisma generate client](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgresql) generates neccessary node-modules to queries database.

4. Start the project

```sh
    npm run dev
```

## Roadmap

- [x] Using [Puppeter](https://pptr.dev/) for data crawling (14+ hrs)\

  - This is the most time-consuming part due to the unavailability of the [f1Formula](https://www.formula1.com/en/drivers.html) source code.
  - Puppeteer launches a headless browser (Chromium) and extracts data using query selectors.
    ![querySelector](/README/findQueries.png)

  - Repeat the process of finding and testing queries until the crawled data is refined. Here's an overview of the steps involved:

    - Create an [API](/src/pages/api/crawlData/f1formula.ts) that triggers the crawling process upon request.
    - On requested: the API launches a browser and navigates to the specified path:

    ```Javascript
        const browser = await puppeteer.launch({
                headless: false,
            })
        const homePage = await browser.newPage()
        await homePage.goto('https://www.formula1.com/en/drivers.html', { waitUntil: 'networkidle2' })
    ```

    ![ApiLaunchBrowser](/README/lauchChromium.png)

    - Handle any modal pop-ups that appear:

      ```Javascript
           await homePage.$('button.trustarc-agree-btn').then(ele => ele?.click())
      ```

      ![AcceptsModal](/README/acceptCookies.png)

    - Once the page loaded fully loaded, Chromium start scraping for Driver's detail url,

    ```Javascript
    const f1Drivers = await getDriverUrl(homePage)
            if (!f1Drivers || f1Drivers.length === 0) return res.status(400).json({ message: "No drivers found" })
    ```

    - By then,Chromium automatically visits each URL scraped.

    ```Javascript
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
    ```

    ![DetailPage](/README/detailPageChromium.png)

    - Finally, store the crawled data in the database:
      ![Database](/README/dataBase.png)
    - To watch the crawling process in action on every page, set the `headless` options to `'new'` in the [API](/src/pages/api/crawlData/f1formula.ts),
      ```Javascript
      const browser = await puppeteer.launch({
              headless: 'new',
          })
      ```

- [x] Build FE with [NextJs-TailwindCss](#pages) (4 hrs)
- [x] Build Graph with [ChartJs](#pages) (1 hrs)
- [x] CronJob on vercel, and you can turn it on/off mannually - [More info](#https://vercel.com/docs/cron-jobs#cron-expressions)

```Json
{
  "crons": [
    {
      "path": "/api/crawlData/f1formula.ts",
      "schedule": "0 3 * * *"
    }
  ]
}
```

![cronJob](/README/cronJob.png)
