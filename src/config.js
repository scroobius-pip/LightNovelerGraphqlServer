const config = {}
config.connector = { connector: {
  expire: {// expiry for redis fields in milliseconds
    chapters: process.env.CONNECTOR_CHAPTERS || 1800,
    novel: process.env.CONNECTOR_NOVEL || 3600,
    novels: process.env.CONNECTOR_NOVELS || 300
  }
}}

config.redis = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  timeout: process.env.REDIS_TIMEOUT || 2500
}

config.rethinkdb = {
  host: process.env.RETHINKDB_HOST,
  port: process.env.RETHINKDB_PORT,
  db: process.env.RETHINKDB_DB,
  table: process.env.RETHINKDB_TABLE
}

config.server = {
  port: process.env.SERVER_PORT || 8081,
  optics_agent: process.env.OPTICS_AGENT
}

config.firebase = {
  'type': process.env.FIREBASE_TYPE,
  'project_id': process.env.FIREBASE_PROJECT_ID,
  'private_key_id': process.env.FIREBASE_PRIVATE_KEY_ID,
  'private_key': process.env.FIREBASE_PRIVATE_KEY,
  'client_email': process.env.FIREBASE_CLIENT_EMAIL,
  'client_id': process.env.FIREBASE_CLIENT_ID,
  'auth_uri': process.env.FIREBASE_AUTH_URI,
  'token_uri': process.env.FIREBASE_TOKEN_URI,
  'auth_provider_x509_cert_url': process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  'client_x509_cert_url': process.env.FIREBASE_CLIENT_X509_CERT_URL
}

export default config
