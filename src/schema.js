const schema = `


interface Novel {

    artist: String
    author: String
    chapters: [Chapter]
    description: String
    genre: [String]
    id: String
    image: String
    language: String
    modified: String!
    name: String!
    status: String
    tags: [String]
    type: String
    year: String

}

interface Chapter {
chapter: String!
volume: String!
content: String!
}

type NovelCrawler implements Novel{
    artist: String
    author: String
    chapters: [Chapter]
    description: String
    genre: [String]
    id: String
    image: String
    language: String
    modified: String!
    name: String!
    novelurl: String
    status: String
    tags: [String]
    type: String
    year: String
}

type ChapterCrawler implements Chapter {
    chapter: String!
    chapterurl: String
    content: String!
    novelurl: String
    volume: String!
}
 


`
const Query = `
type Query {
     novels: [Novel]
}


`

export default [schema, Query]
