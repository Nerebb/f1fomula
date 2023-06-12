import SearchInput from "@/components/SearchInput"
import SwitchTheme from "@/components/SwitchTheme"
import { ChartBarIcon, CubeIcon } from '@heroicons/react/24/outline'
import Link from "next/link"

export default function MainHeader() {
    return (
        <header className="sticky top-0">
            <nav className="bg-white border-gray-200 py-1 md:py-2.5 dark:bg-gray-800">
                <div className="flex justify-between items-center mx-auto space-x-2 md:space-x-10">
                    <Link href={'/'} className="flex items-center space-x-2 dark:text-white">
                        <CubeIcon className='w-8 h-8' />
                        <span className="hidden sm:inline-block self-center md:text-2xl font-semibold whitespace-nowrap">Nereb</span>
                    </Link>
                    <div className="grow"><SearchInput /></div>
                    <SwitchTheme />
                </div>
            </nav>
        </header>
    )
}