import rethinkdbConnector from './rethinkdb'

let r = new rethinkdbConnector()
// r.getChapter('ad35061f-1ac2-48e7-b5c0-23049e7c6fc9','b67bf2bf-e28f-486d-b82e-e7ed9357ba2c')
r.getNovels(['Romance'],{order:'asc',field:'modified'},{page:1,limit:2})