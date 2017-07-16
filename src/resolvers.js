import rethinkdbModel from './rethinkdb/models'

const r = new rethinkdbModel()

const resolver = {
    Query: {
        novels(root, { filter, orderBy, pagination }, context, info) {
            let fields = []
            //console.log(info.fieldNodes[0].selectionSet.selections[1].name.value)
            info.fieldNodes[0].selectionSet.selections.map((field) => {   // I am getting fields requested from query 
                fields.push(field.name.value)
            })
            //console.log(fields)
            return r.getNovels(fields, filter, orderBy, pagination)

        },

        novel(root, { uuid }, context, info) {
            let fields = []
            info.fieldNodes[0].selectionSet.selections.map((field) => {   // I am getting fields requested from query 
                fields.push(field.name.value)
            })
            return r.getNovel(uuid, fields)
        },
        chapter(root, { novel_uuid, chapter_id, type }, context) {
            return r.getChapter(novel_uuid, chapter_id, type)
        },
        chapters(root, { novel_uuid, pagination, type }, context) {
            return r.getChapters(novel_uuid, pagination, type)
        }
    },
    Chapters: {
        __resolveType(obj, context, info) {
            //console.log(obj)
            return 'ChaptersCrawler'
        }
    },

    Chapter: {
        __resolveType(obj,context,info){
            return 'ChapterCrawler'
        }
    }
   
    


}

export default resolver