import casual from 'casual'

const genre = ['romance', 'comedy', 'action']

const Novel = () => ({
  artist: casual.name,
  author: casual.name,

  description: casual.sentences(3),
  genre: [casual.random_element(genre), casual.random_element(genre)],
  id: casual.url,
  image: 'sdfgrtw3wedfgb2345y675trfdvfbghdsfdssfd',
  language: casual.random_element(['chinese', 'japanese', 'korean']),
  modified: casual.date('YYYY-MM-DD'),
  name: casual.word,
  status: casual.random_element(['Completed', 'Ongoing']),
  tags: [],
  novelurl: casual.url,
  type: casual.random_element(['Web Novel', 'Light Novel']),
  year: casual.year
})

const Chapter = () => ({
  chapter: casual.integer(1, 50),
  chapterurl: casual.url,
  content: casual.sentences(10),
  novelurl: casual.url,
  volume: casual.integer(1, 5)
})

const arrNovel = []
const arrChapter = []
for (let x = 0; x < 5; ++x) {
  arrNovel.push(Novel())
  arrChapter.push(Chapter())
}

const mock = {
  Query: { novels: () => arrNovel },
  Novel: {
    __resolveType (obj, context, info) {
      return 'NovelCrawler'
    }

  },
  Chapter: {
    __resolveType (obj, context, info) {
      return 'ChapterCrawler'
    }
  },
  NovelCrawler: {
    chapters () {
      return arrChapter
    }
  }

}

export default mock
