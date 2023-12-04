type Options = {
    callback?: () => void
    props: Record<string, string | number >
}

interface Window {
    plausible: ( event: 'add_fox' | 'remove_fox', options?: Options ) => void
}