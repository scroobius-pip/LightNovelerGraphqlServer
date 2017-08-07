import redisGrapqhl from './redis/models'
import rethinkdbGrapqhl from './rethinkdb/models'
import {config} from './config'
const redis = new redisGrapqhl()
const rethinkdb = new rethinkdbGrapqhl()
const {connector: {expire: {chapters: chaptersEx, novel: novelEx, novels: novelsEx}}} = config

export default class connectors {
  async getChapters (novelUuid, pagination = { page: 1, limit: 5 }, type = 'chapters') {
    const arr = [novelUuid, pagination.page, pagination.limit, type]
    try {
      let fromRedis = await redis.getId(arr)
      if (fromRedis === null) {
        let fromRethink = rethinkdb.getChapters(novelUuid, pagination, type)
        redis.setId(arr, await fromRethink, chaptersEx)
        return fromRethink
      }
      return fromRedis
    } catch (err) {
      throw err
    }
  }
  async getChapter (novelUuid, chapterId, type = 'chapters') {
    const arr = [novelUuid, chapterId, type]
    try {
      let fromRedis = await redis.getId(arr)
      if (fromRedis === null) {
        let fromRethink = rethinkdb.getChapter(novelUuid, chapterId, type)
        redis.setId(arr, await fromRethink, chaptersEx)
        return fromRethink
      }
      return fromRedis
    } catch (err) {
      throw err
    }
  }
  async getNovels (fields = ['uuid', 'name', 'modified'], order = { field: 'modified', arr: 'dsc' }, pagination = { page: 1, limit: 5 }, filter) {
    const arr = [...fields, ...(filter === undefined ? [] : filter.sort()), order.arr, order.field, pagination.limit, pagination.page]
    try {
      let fromRedis = await redis.getId(arr)
      if (fromRedis === null) {
        let fromRethink = rethinkdb.getNovels(fields, order, pagination, filter)
        redis.setId(arr, await fromRethink, novelsEx)
        return fromRethink
      }
      return fromRedis
    } catch (err) {
      throw err
    }
  }
  async getNovel (novelUuid, fields = ['modified', 'name']) {
    const arr = [novelUuid, ...fields]
    try {
      let fromRedis = await redis.getId(arr)
      if (fromRedis === null) {
        let fromRethink = rethinkdb.getNovel(novelUuid, fields)
        redis.setId(arr, await fromRethink, novelEx)
        // console.log(await fromRethink, 'From Rethink')
        return fromRethink
      }
     // console.log(await fromRedis, 'From Redis')
      return fromRedis
    } catch (err) {
      throw err
    }
  }
}
