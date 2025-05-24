use test # Create a new database named 'test'
db.createCollection("users") # Create a collection named 'users'


# Thêm document
db.users.insertOne({ name: "Alice", email: "alice@example.com" })
db.users.insertMany([
  { name: "Bob", email: "bob@example.com" },
  { name: "Charlie", email: "charlie@example.com" }
])

# Xem dữ liệu
db.users.find().pretty()

