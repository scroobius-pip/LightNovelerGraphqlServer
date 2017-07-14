import r from 'rethinkdb'
import { rethinkdb_config } from './config'

const { host, port, db, table } = rethinkdb_config
// let conn
// r.connect({ host: 'api.lightnoveler.com', port: 28015 })
//     .then(connection=>{
//         return r.db('lightnovels').table('novels').getAll('ad35061f-1ac2-48e7-b5c0-23049e7c6fc9',{index:'uuid'})(0)('chapters').pluck('chapter','id','volume','modified').orderBy(r.desc('modified')).slice(13,14).run(connection)

//     }).then((doc)=>{
//         console.log(doc)
//     })
//     .error(err=>{throw err})
export default class rethinkGraphql {

    constructor() {
        // let { host, port } = rethinkdb_config
        this.connection = r.connect({ host, port })

        // .then(conn => {
        //     this.conn = conn
        // })
        // .error(err=>{throw err})
    }

    getChapters(novelUuid, pagination = { page: 1, limit: 5 }) {
        let { page, limit } = pagination
        // console.log(novelUuid,page,limit)
        this.connection
            .then(conn => {
                r.db(db).table(table).getAll(novelUuid, { index: 'uuid' })(0)('chapters').pluck('chapter', 'id', 'volume', 'modified').orderBy(r.desc('modified')).slice(limit * (page - 1), limit * page).run(conn)
                    .then(doc => {
                        console.log(doc)
                    })
            })
            .error(err => { throw err })


    }

    getChapter(novelUuid, chapterId) {
        this.connection
            .then(conn => {
                r.db(db).table(table).getAll(novelUuid, { index: 'uuid' })(0)('chapters').filter({ id: chapterId })(0).run(conn)
                    .then(doc => {
                        console.log(doc)
                    })
            })
            .error(err => { throw err })
    }

    getNovels(filter = [], order = { field: 'modified', arr: 'dsc' }, pagination = { page: 1, limit: 5 }) {
        let { field, arr } = order
        let { page, limit } = pagination

        field = field == 'modified' || field == 'name' ? field : 'modified'
        arr = arr == 'asc' || arr == 'dsc' ? arr : 'asc'
        const ascOrDsc = arr == 'asc' ? r.asc : r.desc

        this.connection
            .then(conn => {
                r.db(db).table(table).filter(function (x) {
                    return x('genre').contains(...filter)
                }).pluck('uuid', 'name', field == 'modified'?'modified':null).orderBy(ascOrDsc(field)).slice(limit * (page - 1), limit * page).run(conn)
                    .then(doc => {
                        console.log(doc)
                    })
            })
            .error(err => { throw err })
    }


}

