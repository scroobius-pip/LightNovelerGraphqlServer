const schema = `


interface Novel {

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

interface Chapter {
chapter: String!
volume: String!
content: String!
id: String!
}

type NovelCrawler implements Novel{
    artist: String
    author: String
    chapters: [Chapter]
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

type ChapterCrawler implements Chapter {
    chapter: String!
    content: String!
    volume: String!
    modified: String!
    id: String!
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
     novels(filter:[String!]!,orderBy:order!,pagination:page_limit!): [Novel]
     novel(uuid: String!): Novel
     chapter(novel_uuid:String!,chapter_id:String!): Chapter
     chapters(novel_uuid:String!,pagination:page_limit!): [Chapter]
}


`

export default [schema, Query]
