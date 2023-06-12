import { format, parse } from 'date-fns'

export function dateFnsFormat(date: string | number | Date, dateType = 'yyyy-MM-dd', options?: {
    locale?: Locale
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    firstWeekContainsDate?: number
    useAdditionalWeekYearTokens?: boolean
    useAdditionalDayOfYearTokens?: boolean
}) {
    const formatedDate = format(new Date(date), dateType, options)
    return formatedDate
}

export function dateFnsParse(dateString: string) {
    const date = parse(dateString, 'dd/MM/yyyy', new Date())
    return date
}