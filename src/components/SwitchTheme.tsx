import { MoonIcon } from '@heroicons/react/20/solid';
import { SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from "next-themes";

type Props = {}

export default function SwitchTheme({ }: Props) {
    const { systemTheme, theme, setTheme } = useTheme();

    function handleOnchange() {
        theme == "dark" ? setTheme('light') : setTheme("dark")
    }

    return (
        <button
            onClick={handleOnchange}
            title='Switch theme'
        >
            {theme === 'light' ? (
                <SunIcon className='w-6 h-6' />
            ) : (
                <MoonIcon className='w-6 h-6 dark:text-white' />
            )}
        </button>
    )
}