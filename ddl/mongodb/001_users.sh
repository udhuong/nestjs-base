db.createCollection("users")
db.ten_collection.createIndex({ email: 1 }, { unique: true })
db.ten_collection.createIndex({ username: 1 }, { unique: true })
db.ten_collection.createIndex({ phone: 1 })

