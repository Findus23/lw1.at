export enum Language {
    de = "de",
    en = "en"
}


export interface DataEntry {
    id: string;
    title: string
    date: string
    description: string
    tags: string[]
    image: string
    github: string | null
    license: {
        id: string
        url: string
    }

}
