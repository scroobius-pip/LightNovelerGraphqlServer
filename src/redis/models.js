import redis from 'redis'
import bluebird from 'bluebird'
import { redisConfig } from './config'
import {promiseTimeout} from '../utils/timeout-promise'
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

export default class redisGraqphl {
  constructor () {
    this.client = redis.createClient(redisConfig)
    this.client.on('error', err => {
      console.log(err)
    })
    this.client.on('end', () => {
      console.log('Redis Connection failed retrying')
    })
    this.client.on('connect', () => {
      console.log('Redis Connected')
    })
    this.client.on('reconnecting', () => {
      console.log('Redis Reconnecting')
    })
  }
  async getId (ids = []) {
    ids = ids.join('-')
    try {
      return JSON.parse(await promiseTimeout(5000, this.client.getAsync(ids)))
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async setId (ids = [], value, expire) {
    value = JSON.stringify(value)
    ids = ids.join('-')
    try {
      if (expire === undefined) {
        await this.client.setAsync(ids, value)
      } else {
        await this.client.setAsync(ids, value, 'EX', expire)
      }
    } catch (error) {
      throw error
    }
  }
}
