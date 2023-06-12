import React from 'react'

type Props = {}

export default function Chip({ children }: React.PropsWithChildren) {
    return (
        <div
            className="bg-primary-100 text-primary-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-primary-400 border border-primary-400"
        >
            {children}
        </div>
    )
}