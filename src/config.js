let config = {}
config.connector = { connector: {
  expire: {// expiry for redis fields in milliseconds
    chapters: 1800,
    novel: 3600,
    novels: 300
  }
}}

config.redis = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379
}

config.rethinkdb = {
  host: process.env.RETHINKDB_HOST || 'api.lightnoveler.com',
  port: process.env.RETHINKDB_PORT || 28015,
  db: process.env.RETHINKDB_DB || 'lightnovels',
  table: process.env.RETHINKDB_TABLE || 'novels'
}

export default config
