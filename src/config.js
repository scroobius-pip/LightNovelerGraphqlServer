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
  host: process.env.RETHINKDB_HOST || 'api.lightnoveler.com',
  port: process.env.RETHINKDB_PORT || 28015,
  db: process.env.RETHINKDB_DB || 'lightnovels',
  table: process.env.RETHINKDB_TABLE || 'novels'
}

config.server = {
  port: process.env.SERVER_PORT || 8081,
  optics_agent: process.env.OPTICS_AGENT
}

config.firebase = {
  'type': process.env.FIREBASE_TYPE || 'service_account',
  'project_id': process.env.FIREBASE_PROJECT_ID || 'lightnoveler-8b936',
  'private_key_id': process.env.FIREBASE_PRIVATE_KEY_ID || '5fe44c63faf2732bf4225dcd55ca9d1648b728af',
  'private_key': process.env.FIREBASE_PRIVATE_KEY || '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1TVAGbi/4+G3x\nAXSO7CZRYw/RcRQW0tA67vj/hj9vvSEw4Mn51LoQjgFoSXgjoTjnLvyNxnDZnlwp\nsG9tnB+kmbaAU6+Ntq5QqADzgjFEzeRQ+UhyiYX+xhZ+aZCXERmcguOQO9UYyLsO\nFAy34TL842iz1z/C5XJ22wZ5DMXlCAGEKr43xOUFCNumNPWn/i/rbjVGvWNIu/M8\n3bYGYIEaVmCsSa5btg16tmyNVIdAQjlWd0iU7eGIEQHoOwKP0O8M1yfVlFk3+wbF\nSsscNnXS4dCKa/BhYT2Ia0yD1c+oE8tJiem1SQ9ikFkk+SJvYqF1uUY/vvej6h2J\nMmLcSC2jAgMBAAECggEATc7WT0wurmz/0fTL7yKN91PKUBp1gq4Ky6APoKoew3ep\nrO5sABo5mC05kWYmdzQT1bOmk7ncaKi76PBdge8E7YFCf6RqrSj/eoH/loIDXwH1\nwIKbgvxeU070DGCFuy+NjEvoGdhzxeUv0gTsyGWPmlSGdNgl9yC9lSC+kGjY7Udf\nJrIW75+DaH8FPpxK4HiXpX0kF7rTW2CEME72xcgPi+HSv7au8Qrvjpw8MlaYQqUN\nLBnNwvCoPqITXK0+ZOzVDCYltStMf4jAcqWy/GFX675V8WVtqeAd0EGfaVLlyktT\nK5lingTV70vqTQhMjuGi4XsXFHS+tq8ogrEcsEM/EQKBgQDis9L94oRQtQ6Yap6z\n5TwwcC/xZXAgFiDyhRNc8Ql3lOJ6zd1yY9Lcz4iXBGQIPqj9d7rO4vbuE/03xEy/\nyXDHan00nRUUjywVeQIu5eQcztDmPGYKluLiqv+hdao2IAv/5xG3AImQd0MviXrQ\n52ykwc4cbbMqcS6fjRn/nSfItQKBgQDMu3hNlDJoS6jNkRgp8Xk8f/NqOkFiO7oL\nUr+1BiHaEIRr1bVVsVlPILRjpZEaT0xzsMyWRLOfYGVltAIchvXq7w0hoN5Zg2yy\nZCEX1V2A/+51VGHDNcnr9siaAgs0fUxa1yHyTnKaddVr7vPPPFvW63VqhVrnlKbb\nOdiSIIbL9wKBgQCBCIVRSHqzTTqvehA2qIVntJM1PN1jBfVe1Gu+/Nq8m5uE9mPS\n1gqQ7/b4reEZ6EBbdKh5VSnjPLFl6m8cwlVUy8HUDoyPFSasWiHp+6Oo2faA9WPH\nJzageV/i0Iw/HmJ2F1k35jBmb9tn1UJ4YSCvbjgYakAOKjm1SqS/nv2j+QKBgEK6\nF0uxsXwsrKfTUnzZJxqA2WUV95l8vfZS0gi+Jupb180NqjxzwRf5INIZdGGO1uwe\nA5A2dBTN5j5vnQCPPDeGElGTjOS/4P2DhQWvlPomcCHtjq+BKH6vwFHxuJUzAV/a\nHkZLKy8MmLLE/tHcalJyC6LcM/SmjnuFLwDxeP2hAoGBANZJP73gt6ze7ZqQmA3A\nHb3TW0h1wCLnTaXbm1m7FNHVRq1PXo8dr6ZOcmBgyIkA6QiHtHsJ/hwmu2dhA09Q\nJl5Sh80uJYjxLCQs04SypffFcoN/PYz3tlJpKUjwGAgZU/C13CaNJ6MvcM7FYtbJ\nbQ3cOciIQlnolrdgPlfd8Gvw\n-----END PRIVATE KEY-----\n',
  'client_email': process.env.FIREBASE_CLIENT_EMAIL || 'firebase-adminsdk-oovax@lightnoveler-8b936.iam.gserviceaccount.com',
  'client_id': process.env.FIREBASE_CLIENT_ID || '101996447189200447040',
  'auth_uri': process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
  'token_uri': process.env.FIREBASE_TOKEN_URI || 'https://accounts.google.com/o/oauth2/token',
  'auth_provider_x509_cert_url': process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
  'client_x509_cert_url': process.env.FIREBASE_CLIENT_X509_CERT_URL || 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oovax%40lightnoveler-8b936.iam.gserviceaccount.com'
}

export default config
