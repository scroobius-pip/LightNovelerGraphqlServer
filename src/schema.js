const schema = `
schema {
    query: Query
}

type Novels {

    author: String
    genre: [String]
    image: String
    name: String!
    status: String
    tags: [String]
    type: String
    year: String
    uuid: String!
    modified: String
}

type Novel{
    artist: String
    author: String
    description: String
    genre: [String]
    image: String
    language: String
    modified: String!
    name: String!
    status: String
    tags: [String]
    type: String
    year: String
    uuid: String!
}

interface Chapters {
    chapter: String!
    volume: String!
    id: String!
    modified: String!
}

type ChaptersCrawler implements Chapters {
    chapter: String!
    volume: String!
    id: String!
    modified: String!
}

interface Chapter {
    volume: String!
    chapter: String!
    id: String!
    content: String
}

type ChapterCrawler implements Chapter {
    volume: String!
    chapter: String!
    id: String!
    content: String
}

input order{
    field: String!
    arr: String!
}

input page_limit {
    page: Int!
    limit: Int!
}

`
const Query = `
type Query {
     novels(filter:[String!],orderBy:order!,pagination:page_limit!): [Novels]!
     novel(uuid: String!): Novel
     chapter(novel_uuid:String!,chapter_id:String!,type:String): Chapter
     chapters(novel_uuid:String!,pagination:page_limit!,type:String): [Chapters]
}


`

export default [schema, Query]
