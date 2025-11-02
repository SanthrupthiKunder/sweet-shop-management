// tests/setupTestDB.js
const mongoose = require('mongoose');

module.exports = {
  connect: async () => {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sweetshop_test';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  },
  clearDatabase: async () => {
    const { collections } = mongoose.connection;
    for (const key in collections) await collections[key].deleteMany({});
  },
  closeDatabase: async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
};
