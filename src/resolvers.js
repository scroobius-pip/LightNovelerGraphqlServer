import rethinkdbModel from './rethinkdb/models'
// import { UserError } from 'graphql-errors'
// const r = new rethinkdbModel()
import connectors from './connector'
const r = new connectors()

const resolver = {
  Query: {
    async novels (root, { filter, orderBy, pagination }, context, info) {
      let fields = []
      info.fieldNodes[0].selectionSet.selections.map((field) => {   // I am getting fields requested from query
        fields.push(field.name.value)
      })
      try {
        const novels = await r.getNovels(fields, orderBy, pagination, filter)
        return novels
      } catch (error) {
        throw error // new Error(error.msg)
      }
    },

    async novel (root, { uuid }, context, info) {
      let fields = []
      info.fieldNodes[0].selectionSet.selections.map((field) => {   // I am getting fields requested from query
        fields.push(field.name.value)
      })
      try {
        const novel = await r.getNovel(uuid, fields)
        return novel
      } catch (error) {
        // console.log(error.msg)
        throw error  // new Error(error.msg)
      }
    },
    async chapter (root, { novel_uuid, chapter_id, type }, context) {
      try {
        const chapter = await r.getChapter(novel_uuid, chapter_id, type)
        return chapter
      } catch (error) {
        throw error// new Error(error.msg)
      }
    },
    async chapters (root, { novel_uuid, pagination, type }, context) {
      try {
        const chapters = await r.getChapters(novel_uuid, pagination, type)
        return chapters
      } catch (error) {
        throw error // new Error(error.msg)
      }
    }
  },
  Chapters: {
    __resolveType (obj, context, info) {
      return 'ChaptersCrawler'
    }
  },

  Chapter: {
    __resolveType (obj, context, info) {
      return 'ChapterCrawler'
    }
  }

}

export default resolver
