import connector from './connector'
const r = new connector()

test('Functions Should Return Promise', async() => {
  let doc = r.getNovels(null, { arr: 'dsc', field: 'modified' }, { page: 1, limit: 4 })
  expect(doc instanceof Promise).toBe(true)
})
