const configs = require('../config/config.js');

const env = process.env.ENV || 'QA';
if (!configs[env]) {
  throw new Error(`Invalid environment: ${env}. Must be QA or PROD.`);
}
const config = configs[env];

const Endpoints = {
    
  create: "/items/1",
  get: (id) => `/items/${id}`,
  update: (id) => `/items/${id}`,
  delete: (id) => `/items/${id}`,

  //BookStore APIs
  health: "/status",
  signup: "/signup",
  login: "/login",
  baseURL:config.baseURL,
  bootstorehealth:"/health",
  bookstoresignup: "/signup",
  bookstorelogin: "/login",
  bookstoreuserbooks:"/books/",
  bookstoreupdatebookdetails: (book_id) => `/books/${book_id}`,
  //Expired Token
  bookstoreexpiredtoken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWVwYWswMUBnbWFpbC5jb20iLCJleHAiOjE3NTQ2NDQ3NDZ9.TRkU9ujRKcJDHszYgJanOS1LQkbhmPsGpQzjbd69f30",
  bookstoretokenType:"Bearer",
  
};


module.exports = { Endpoints, config };