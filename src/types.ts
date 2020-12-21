export type Language = "en" | "de"

export interface Translation {
    en: string;
    de: string;
}

export type translatableString = string | Translation


export interface Tag {
    name: translatableString
    hidden: boolean
}

export interface License {
    id: string
    url: string
}

export interface Iframe {
    url: string
    allowfullscreen: boolean
    sandbox: string
    color: string
}

export interface Article {
    id: string
    url: string
    iframe: Iframe
    try: boolean
    date: string
    dateObj: Date
    image: string
    github: string
    single_language: Language
    license: License
    title: translatableString
    subtitle: translatableString
    description: translatableString,
    image_seperator: boolean,
    tags: string[]
}

export type Tags = { [index: string]: Tag };

export interface YamlImport {
    data: Article[]
    tags: Tags
}

export interface ImageObject {
    path: string
    hash: string
}
