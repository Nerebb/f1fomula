import { driver } from '@prisma/client'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

type Props = {}

const allowedDriverSearch: Array<keyof driver> = ['name', 'position', 'points', 'team', 'country']

export default function SearchInput({ }: Props) {
    const router = useRouter()
    const [searchBy, setSearchBy] = useState<string>()
    const [searchValue, setSearchValue] = useState<string>()
    const [dropDown, setDropDown] = useState<boolean>(false)

    function handleDropDown() {
        setDropDown(prev => !prev)
    }

    function selectSearch(searchBy: string) {
        setSearchBy(searchBy)
    }

    function handleSubmit() {
        if (!searchValue) return
        router.push(`/search?${searchBy ?? 'name'}=${searchValue}`)
    }

    return (
        <div className='w-[inherit]'>
            <div className="relative flex">
                <button
                    className="capitalize flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button"
                    onClick={handleDropDown}
                >
                    {searchBy === 'position' ? 'rank' : searchBy ?? "Search By"}
                    <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                {dropDown && (
                    <div className="absolute top-12 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            {allowedDriverSearch.map((i) => (
                                <li key={`search-${i}`}>
                                    <button
                                        type="button"
                                        className="capitalize inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => selectSearch(i)}
                                    >
                                        {i === 'position' ? 'rank' : i}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div >
                )}
                <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-500"
                        placeholder={
                            searchBy === 'position' || searchBy === 'points'
                                ? 'Search drivers that have greater than...'
                                : "Search drivers..."
                        }
                        onChange={(e) => setSearchValue(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-primary-700 rounded-r-lg border border-primary-700 hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleSubmit}
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}