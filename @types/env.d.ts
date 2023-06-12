namespace NodeJs {
    interface ProcessEnv extends NodeJs.ProcessEnv {
        DATABASE_URL: string
        NEXT_PUBLIC_BASE_URL: string
    }
}