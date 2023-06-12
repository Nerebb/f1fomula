// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dateFnsFormat, dateFnsParse } from '@/utils/dateFns'
import { driverValidate } from '@/utils/schemaValidate'
import { toCamelCase } from '@/utils/toCamelCase'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as Yup from 'yup'
type Data = any

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = {
    image: 'https://media.formula1.com/content/dam/fom-website/drivers/2023drivers/russell.jpg.img.1536.medium.jpg/1677069334466.jpg',
    team: 'mercedes',
    country: 'united kingdom',
    podiums: '10',
    points: '359',
    grandsPrixEntered: '89',
    worldChampionships: 'n/a',
    highestRaceFinish: '1 (x1)',
    highestGridPosition: '1',
    dateOfBirth: '1998-02-15',
    placeOfBirth: "king's lynn, england",
    bio: [
      'He’s the driver with the motto: “If in doubt, go flat out”.',
      'George Russell has lived by it throughout his F1 career to date, out-qualifying seasoned team mate Robert Kubica at all 21 Grands Prix in his rookie season, putting Williams back on the podium in 2021, and landing his first race win with Mercedes in 2022.',
      'That brilliant baseline speed served Russell well as he totted up titles on his way to Formula 1. The Briton stormed to the 2017 GP3 championship and delivered the 2018 Formula 2 crown under immense pressure.',
      'Spotting his potential, world champions Mercedes swooped to sign him to their junior programme in 2017, when Russell already had a DTM deal on the table. He banked more experience with practice sessions with Force India and tests for the Silver Arrows, before landing his Mercedes-powered Williams race drive.',
      'A refusal to cede ground to his rivals - and commitment to a tricky pass – underpins Russell’s winning mentality. And it’s what got him the call-up to replace Lewis Hamilton for a one-off Mercedes appearance for Sakhir 2020 when the reigning champ was struck down by Covid-19.',
      'That star turn saw Russell miss out on pole by just 0.026s and then outrace Mercedes stalwart Valtteri Bottas. Only a bungled pit stop and a heart-breaking late puncture prevented a near-certain maiden win for the up-and-coming super-sub.  ',
      'He kept his head down at Williams in 2021, scoring his first points and podium, all the while keeping his eye on the bigger prize. Having proved himself a hard worker and a tenacious talent, that prize arrived in the form of a chance to take on compatriot and seven-time champion Hamilton in identical machinery.',
      'It was an opportunity Russell relished, as he took his first F1 win – and Mercedes’ only 2022 victory – in Brazil, en route to fourth in the drivers’ championship, two places and 35 points ahead of his illustrious team mate.',
      'If the Silver Arrows can produce a truly competitive car for 2023, a title bid surely beckons. A huge challenge, but as always, ‘Russell the Rocket’ will be going flat out.'
    ],
    name: 'george russell',
    position: '63',
    url: 'asdzxczxcz'
  }

  const world = { worldChampionships: 'n/a', name: "test", url: "test" }
  const validated = driverValidate.validateSync(world)
  res.status(200).json({ validated })
}
