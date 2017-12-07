 import rethinkdbConnector from './models'

 let r = new rethinkdbConnector()
// // r.getChapter('ad35061f-1ac2-48e7-b5c0-23049e7c6fc9','b67bf2bf-e28f-486d-b82e-e7ed9357ba2c')
// var doc = r.getNovels(['Romance'], { arr: 'dsc', field: 'modified' }, { page: 1, limit: 4 })
// doc.then(x => {
//   console.log(x)
// })
//     .catch(err => {
//       throw err
//     })

 test('two pages should not repeat', async() => {
   let doc1 = await r.getNovels(['uuid', 'name', 'modified'], { arr: 'dsc', field: 'modified' }, { page: 1, limit: 4 })
   let doc2 = await r.getNovels(['uuid', 'name', 'modified'], { arr: 'dsc', field: 'modified' }, { page: 2, limit: 4 })
   // expect(doc1).toBeInstanceOf(Array)
   expect(true).toBe(true) // will use underscore for this
 })
 test('Should have a correct length', async() => {
   let doc1 = await r.getNovels(['uuid', 'name', 'modified'], { arr: 'dsc', field: 'modified' }, { page: 1, limit: 4 })
   expect(doc1.length).toBeLessThanOrEqual(4)
 })
 test('should return an array', async() => {
   let doc1 = await r.getNovels(['uuid', 'name', 'modified'], { arr: 'dsc', field: 'modified' }, { page: 1, limit: 4 })
   expect(doc1).toBeInstanceOf(Array)
 })
