
import rethinkdbdash from 'rethinkdbdash'
import config from '../config'
const { host, port, db, table } = config.rethinkdb
let r = rethinkdbdash(
  {
    servers: [
      { host, port }
    ]
  }
)
export default class RethinkGraphql {
  getChapters (novelUuid, pagination = { page: 1, limit: 5 }, type = 'chapters') {
    let { page, limit } = pagination
    return r.db(db).table(table).getAll(novelUuid, { index: 'uuid' })(0)(type).pluck('chapter', 'id', 'volume', 'modified').orderBy(r.desc('modified')).slice(limit * (page - 1), limit * page).run()
  }

  getChapter (novelUuid, chapterId, type = 'chapters') {
    return r.db(db).table(table).getAll(novelUuid, { index: 'uuid' })(0)(type).filter({ id: chapterId })(0).run()
  }

  getNovels (fields = ['uuid', 'name', 'modified'], order = { field: 'modified', arr: 'dsc' }, pagination = { page: 1, limit: 5 }, filter) {
    let { field, arr } = order
    let { page, limit } = pagination
    // I have to handle cases of negative numbers
    page = Math.abs(page)   // This doesn't seem right i shouldn't handlie negative numbers in server, Should validate at client side, throw an error if passed negative numbers to server
    limit = Math.abs(limit)

    field = field === 'modified' || field === 'name' ? field : 'modified'
    arr = arr === 'asc' || arr === 'dsc' ? arr : 'asc'
    const ascOrDsc = arr === 'asc' ? r.asc : r.desc

    if (filter === undefined) {
      return r.db(db).table(table).orderBy({ index: ascOrDsc(field) }).pluck(...fields).slice(limit * (page - 1), limit * page).run()
    } else {
      return r.db(db).table(table).filter(function (x) {
        return x('genre').contains(...filter)
      }).pluck(...fields, 'name', 'modified').orderBy(ascOrDsc(field)).slice(limit * (page - 1), limit * page).run()
    }
  }

  getNovel (novelUuid, fields = ['modified', 'name']) {
    return r.db(db).table(table).getAll(novelUuid, { index: 'uuid' }).pluck(...fields)(0).run()
  }

  getNovelImage (novelUuid) {
    return r.db(db).table(table).getAll(novelUuid, { index: 'uuid' }).pluck('image')(0)('image').run()
  }
}
