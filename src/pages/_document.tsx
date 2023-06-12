import { useTheme } from 'next-themes'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'

export default function Document() {
  // const { theme, systemTheme, setTheme } = useTheme()

  // useEffect(() => {
  //   if (theme) return
  //   setTheme(systemTheme ?? 'light')
  // }, [])

  return (
    <Html lang="en">
      <Head />
      <body className='dark:bg-gray-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
