'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _casual = require('casual');

var _casual2 = _interopRequireDefault(_casual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var genre = ['romance', 'comedy', 'action'];

var Novel = function Novel() {
    return {
        artist: _casual2.default.name,
        author: _casual2.default.name,

        description: _casual2.default.sentences(3),
        genre: [_casual2.default.random_element(genre), _casual2.default.random_element(genre)],
        id: _casual2.default.url,
        image: 'sdfgrtw3wedfgb2345y675trfdvfbghdsfdssfd',
        language: _casual2.default.random_element(['chinese', 'japanese', 'korean']),
        modified: _casual2.default.date('YYYY-MM-DD'),
        name: _casual2.default.word,
        status: _casual2.default.random_element(['Completed', 'Ongoing']),
        tags: [],
        novelurl: _casual2.default.url,
        type: _casual2.default.random_element(['Web Novel', 'Light Novel']),
        year: _casual2.default.year
    };
};

var Chapter = function Chapter() {
    return {
        chapter: _casual2.default.integer(1, 50),
        chapterurl: _casual2.default.url,
        content: _casual2.default.sentences(10),
        novelurl: _casual2.default.url,
        volume: _casual2.default.integer(1, 5)
    };
};

var arrNovel = [];
var arrChapter = [];
for (var x = 0; x < 5; ++x) {
    arrNovel.push(Novel());
    arrChapter.push(Chapter());
}

var mock = {
    Query: { novels: function novels() {
            return arrNovel;
        } },
    Novel: {
        __resolveType: function __resolveType(obj, context, info) {
            return 'NovelCrawler';
        }
    },
    Chapter: {
        __resolveType: function __resolveType(obj, context, info) {
            return 'ChapterCrawler';
        }
    },
    NovelCrawler: {
        chapters: function chapters() {
            return arrChapter;
        }
    }

};

exports.default = mock;