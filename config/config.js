const BookStoreCreateBookDataPayload = require('../fixtures/BookStoreCreateBookDataPayload.json');

module.exports = {
  QA: {
    baseURL: "http://127.0.0.1:8000",
    userId:BookStoreCreateBookDataPayload.id,
    userEmail: BookStoreCreateBookDataPayload.email,
    password: BookStoreCreateBookDataPayload.password
  },
  PROD: {
    baseURL: "https://prod.myapi.com",
    userEmail: BookStoreCreateBookDataPayload.email,
    password: BookStoreCreateBookDataPayload.password
  }
};
