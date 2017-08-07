import redisGraphql from './models'
let r = new redisGraphql()

// r.getId(['kldjs', 23, '345', 34, ''])
test('Should be equal', async () => {
  let obj = { name: 'simdi' }
  let objArr = [{ name: 'simdi' }, { name: 'amomi' }]
  let idsObjs = ['kldjs', 23, '345', 34, '']
  let idsObjsArr = ['skdlf', 'ekfl3', 3]
  await r.setId(idsObjs, obj)
  await r.setId(idsObjsArr, objArr)
  expect(await r.getId(idsObjs)).toEqual(obj)
  expect(await r.getId(idsObjsArr)).toEqual(objArr)
  expect(await r.getId(['dsf', 'er3'])).toEqual(null)
})
