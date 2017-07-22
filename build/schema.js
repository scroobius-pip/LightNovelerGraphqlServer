"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var schema = "\nschema {\n    query: Query\n}\n\ntype Novels {\n\n    author: String\n    genre: [String]\n    image: String\n    name: String!\n    status: String\n    tags: [String]\n    type: String\n    year: String\n    uuid: String!\n    modified: String\n}\n\ntype Novel{\n    artist: String\n    author: String\n    description: String\n    genre: [String]\n    image: String\n    language: String\n    modified: String!\n    name: String!\n    status: String\n    tags: [String]\n    type: String\n    year: String\n    uuid: String!\n}\n\ninterface Chapters {\n    chapter: String!\n    volume: String!\n    id: String!\n    modified: String!\n}\n\ntype ChaptersCrawler implements Chapters {\n    chapter: String!\n    volume: String!\n    id: String!\n    modified: String!\n}\n\ninterface Chapter {\n    volume: String!\n    chapter: String!\n    id: String!\n    content: String\n}\n\ntype ChapterCrawler implements Chapter {\n    volume: String!\n    chapter: String!\n    id: String!\n    content: String\n}\n\ninput order{\n    field: String!\n    arr: String!\n}\n\ninput page_limit {\n    page: Int!\n    limit: Int!\n}\n\n";
var Query = "\ntype Query {\n     novels(filter:[String!],orderBy:order!,pagination:page_limit!): [Novels]!\n     novel(uuid: String!): Novel\n     chapter(novel_uuid:String!,chapter_id:String!,type:String): Chapter\n     chapters(novel_uuid:String!,pagination:page_limit!,type:String): [Chapters]\n}\n\n\n";

exports.default = [schema, Query];