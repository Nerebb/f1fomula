This is a [F1 Formula Drivers]() websites where we updates the latest status of drivers.

## TABLE OF CONTENT

- [About The Project](#about-the-project)
- [Build Stack](#build-with)
- [Getting started](#getting-started)
- [Road map](#roadmap)

## About The Project

### Build with

<img alt='NextJs' width='25px' style="filter: brightness(0) invert(1); padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg" />
<img alt="Prisma" width='22px' style="filter: brightness(0) invert(1); padding-right:10px;" src='./prisma_icon.png'>
<img alt="ChartJs" width='25px' style="padding-right:10px;" src='https://scicoding.com/content/images/2021/09/chartjs-logo-1.svg'>

<br/>
<br/>

- I Choose NextJs because the requirements is full stack and it's not very large, so using NextJs Serverless will be more efficent, and once upload to vercel, it's support [CronJob](https://vercel.com/blog/cron-jobs) which will automaticly request an api every settled times.

- For crawl data, [Pupeteer](https://pptr.dev/) is the most easy to start, the most downside is it must wait to page fully loaded to get the final data, which is very time consuming .But Pupetter can upscale by setting multiple automatic crawlers at a same time.

- For Database, Prisma with MySql, since the data is not consistence, the helps of prisma ORM and SQL database would make mine scraped data more purely.

### Pages

- [Home page]()
  - User can view a charts by Driver's points.
    ![Charts](/readme/chartByPoints.png)
  - User can click in one of a chart's bar to navigate to selected Driver by #hash, click Readmore to navigate to Detail page of that driver.
    ![DriverCard](/readme/allDrivers.png)
- [Search page](/)
  - User can search through drivers by search bar, with provided keys
    ![SearchDrivers](/readme/searchPage.png)
- [Detail page](/)
  - View fully detail of a Driver by id.
    ![DetailDriver](/readme/detailPage.png)

## Getting started

This stack using npm:

```sh
npm install
```

### Enviroments

There's only 2 [env variables](/next-env.d.ts):

- DATABASE_URL: This is the MySQL Url that helps prisma to connect to a Db.[For more info](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-planetscale#connecting-your-database)
- NEXT_PUBLIC_BASE_URL: Url of the production build, which helps config some href attributes.

### Installation

- Database: The stacks using MySQL as database and Prisma for ORM.
  - [prisma db push](/prisma/schema.prisma) generate configured schema into MySQL tables.
  - [prisma generate client](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgresql) generates neccessary node-modules to queries database.

```sh
    npx prisma db push
    npx prisma generate client
```

- Now you can start the code:

```sh
    npm run dev
```

## Roadmap

- [x] Using [puppeter](https://pptr.dev/) to crawl data (14+ hrs)\

  - This is the most time-consuming part due to I don't have [f1Formula] source code
  - The puppeter will launch a automatic browser (chromeium)
  - Then Using querySelector to crawl text from html.
    ![querySelector](/readme/findQueries.png)

    Repeat finding and testing the queries until the crawled data is refined.And here's what I done to crawl the data:

    - Create an [API](/src/pages/api/crawlData/f1formula.ts) which will start crawling every time i requested.
    - On requested: It's will start a browser headlessly, then go to the desinated path:

    ```Javascript
        const browser = await puppeteer.launch({
                headless: false,
            })
        const homePage = await browser.newPage()
        await homePage.goto('https://www.formula1.com/en/drivers.html', { waitUntil: 'networkidle2' })
    ```

    ![ApiLaunchBrowser](/readme/lauchChromium.png)

    - Then I will check if there any modals pop-ups, if true then click to proceeds.

      ```Javascript
           await homePage.$('button.trustarc-agree-btn').then(ele => ele?.click())
      ```

      ![AcceptsModal](/readme/acceptCookies.png)

    - After got all the drivers url, Chromium will automaticly visiting all the urls.

    ```Javascript
    const f1Drivers = await getDriverUrl(homePage)
            if (!f1Drivers || f1Drivers.length === 0) return res.status(400).json({ message: "No drivers found" })
    ```

    ![DetailPage](/readme/detailPageChromium.png)

    - When things done, store crawled database.
      ![Database](/readme/dataBase.png)
    - You can easily watch it's automatic running on everypage just simply change the headless to 'new' on the [API](/src/pages/api/crawlData/f1formula.ts),
      ```Javascript
      const browser = await puppeteer.launch({
              headless: 'new',
          })
      ```

- [x] Build FE with [NextJs-TailwindCss](#pages) (4 hrs)
- [x] Build Graph with [ChartJs](#pages) (1 hrs)
