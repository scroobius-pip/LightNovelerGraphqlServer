import r from 'rethinkdb'
import { rethinkdb_config } from './config'

const { host, port, db, table } = rethinkdb_config

export default class rethinkGraphql {

    constructor() {
        this.connection = r.connect({ host, port })


    }

    getChapters(novelUuid, pagination = { page: 1, limit: 5 }, type = 'chapters') {
        let { page, limit } = pagination
        return this.connection
            .then(conn => {
                return r.db(db).table(table).getAll(novelUuid, { index: 'uuid' })(0)(type).pluck('chapter', 'id', 'volume', 'modified').orderBy(r.desc('modified')).slice(limit * (page - 1), limit * page).run(conn)
                // .then(doc => {
                //     console.log(doc)
                // })
            })
            .catch(err => { throw err })


    }

    getChapter(novelUuid, chapterId, type = 'chapters') {
        return this.connection
            .then(conn => {
                return r.db(db).table(table).getAll(novelUuid, { index: 'uuid' })(0)(type).filter({ id: chapterId })(0).run(conn)
                // .then(doc => {
                //     console.log(doc)
                // })
            })
            .catch(err => { throw err })
    }

    getNovels(fields = ['uuid', 'name', 'modified'], filter = [], order = { field: 'modified', arr: 'dsc' }, pagination = { page: 1, limit: 5 }) {
        let { field, arr } = order
        let { page, limit } = pagination
        // I have to handle cases of negative numbers 
        page = Math.abs(page)
        limit = Math.abs(limit)
        field = field == 'modified' || field == 'name' ? field : 'modified'
        arr = arr == 'asc' || arr == 'dsc' ? arr : 'asc'
        const ascOrDsc = arr == 'asc' ? r.asc : r.desc

        return this.connection
            .then(conn => {
                return r.db(db).table(table).filter(function (x) {
                    return x('genre').contains(...filter)
                }).pluck(...fields, 'name', 'modified').orderBy(ascOrDsc(field)).slice(limit * (page - 1), limit * page).run(conn)
                // .then(doc => {
                //     console.log(doc)
                // })
            })
            .catch(err => { throw err })
    }

    getNovel(novelUuid, fields = ['modified', 'name']) {
        return this.connection
            .then(conn => {
                return r.db(db).table(table).getAll(novelUuid, { index: 'uuid' }).pluck(...fields)(0).run(conn)
                // .then(doc => {
                //     console.log(doc)
                // })

            })
            .catch(err => { throw err })
    }

    getNovelImage(novelUuid) {
        return this.connection
            .then(conn => {
                return r.db(db).table(table).getAll(novelUuid, { index: 'uuid' }).pluck('image')(0)('image').run(conn)
                // .then(doc => {
                //     console.log(doc)
                // })

            })
            .catch(err => { throw err })

    }


}

