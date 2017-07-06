"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var schema = "\n\n\ninterface Novel {\n\n    artist: String\n    author: String\n    chapters: [Chapter]\n    description: String\n    genre: [String]\n    id: String\n    image: String\n    language: String\n    modified: String!\n    name: String!\n    status: String\n    tags: [String]\n    type: String\n    year: String\n\n}\n\ninterface Chapter {\nchapter: String!\nvolume: String!\ncontent: String!\n}\n\ntype NovelCrawler implements Novel{\n    artist: String\n    author: String\n    chapters: [Chapter]\n    description: String\n    genre: [String]\n    id: String\n    image: String\n    language: String\n    modified: String!\n    name: String!\n    novelurl: String\n    status: String\n    tags: [String]\n    type: String\n    year: String\n}\n\ntype ChapterCrawler implements Chapter {\n    chapter: String!\n    chapterurl: String\n    content: String!\n    novelurl: String\n    volume: String!\n}\n \n\n\n";
var Query = "\ntype Query {\n     novels: [Novel]\n}\n\n\n";

exports.default = [schema, Query];