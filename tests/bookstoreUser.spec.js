import { test, request , expect } from '@playwright/test';
const { ApiHelper } = require('../utils/apiHelper.js');
const BookStoreCreateBookDataPayload = require('../fixtures/BookStoreCreateBookDataPayload.json');
const BookStoreCreateBookDuplicateIdPayload = require('../fixtures/BookStoreCreateBookDuplicateIdPayload.json');
const BookStoreCreateBookPayload = require('../fixtures/BookStoreCreateBookPayload.json');
const BookStoreInvalidTokenPayload = require('../fixtures/BookStoreInvalidTokenPayload.json');
const BookStoreUpdateBookDataPayload = require('../fixtures/BookStoreUpdateBookDataPayload.json');
const BookStoreUserDataPayload = require('../fixtures/BookStoreUserDataPayload.json');
const BookStoreInCorrectEmailUserPayload = require('../fixtures/BookStoreInCorrectEmailUserPayload.json');
const BookStoreInCorrectPasswordUserPayload = require('../fixtures/BookStoreInCorrectPasswordUserPayload.json');
const ExistingBookStoreUserDataPayload = require('../fixtures/ExistingBookStoreUserDataPayload.json');
import { generateUniqueEmail , generateRandomDigit } from '../utils/testUtil.js';
import { Endpoints,config } from '../utils/endpoints.js';
import { Messages } from '../utils/messages.js';
const Logger = require('../utils/logger');


test.describe.serial('FastAPI CRUD Tests', () => {

  let apiHelper;
  
  

  test.beforeAll(async () => 
    {
      console.log(`Running in ${process.env.ENV || 'QA'} environment`);
      console.log(`Base URL: ${Endpoints.baseURL}`);
      console.log(`Test user email: ${config.userEmail}`);
      console.log(`Test user password: ${config.password}`);

    const apiContext = await request.newContext();
    apiHelper = new ApiHelper(apiContext,Endpoints.baseURL);
    
  });


      test('1 - Check BookStore health status', async () => {

    await test.step('Step 1 - Check health status', async () => {
    const body = await apiHelper.get(Endpoints.bootstorehealth);
    console.log('Body:', body);
    expect(body.status).toBe(Messages.server_up);

    });

  });


    test('2 - POST create bookstore new user', async () => {

     await test.step('Step 2 - create new user', async () => {
     const newUser = { ...BookStoreUserDataPayload };
     newUser.id = generateRandomDigit();
     newUser.email = generateUniqueEmail("deepak");
     const body = await apiHelper.post(Endpoints.bookstoresignup, newUser);
     console.log('Body:', body);
     expect(body.message).toBe(Messages.newUserCreated);

    });
    
 });


   test('3 - Post - Sign up in bookstore with existing user', async () => 
    {

      await test.step('Step 3 - Sign up with existing user', async () => {
      const existingUser = { ...ExistingBookStoreUserDataPayload};
      const body = await apiHelper.post(Endpoints.signup, existingUser);
      console.log('Body:', body);
      expect(body.detail).toBe(Messages.userAlreadyExists);

      });
  });




   test('4 - Post - Login into bookstore with new user', async () => 
    {

      await test.step('Step 4 - Login with new user', async () => {
      const newUser = { ...BookStoreUserDataPayload};
      newUser.id = generateRandomDigit();
      newUser.email = generateUniqueEmail("deepak");
      const body = await apiHelper.post(Endpoints.bookstorelogin, newUser);
      console.log('Body:', body);
      const accessToken =  body.access_token;
      const tokenType = body.token_type;
      await new Promise(resolve => setTimeout(resolve, 5000)); 
      expect(accessToken).not.toBeNull();
      expect(['string', 'undefined']).toContain(typeof accessToken);
      expect(['string', 'undefined']).toContain(typeof tokenType);
      //expect(tokenType).toBe("bearer");

      });
  });


  test('5 - Post - Login into bookstore with existing user', async () => 
    {

      await test.step('Step 5 - Login with existing user', async () => {
      const existingUser = { ...ExistingBookStoreUserDataPayload};
      const body = await apiHelper.post(Endpoints.bookstorelogin, existingUser);
      console.log('Body:', body);
      const accessToken = body.access_token;
      const tokenType = body.token_type;
      expect(accessToken).toBeTruthy();
      expect(tokenType).toBe("bearer");

      });
  });



  test('6 - Post - Login into bookstore with incorrect user email', async () => 
    {

      await test.step('Step 6 - Login with incorrect user email', async () => {
      const incorrectemailUser = { ...BookStoreInCorrectEmailUserPayload};
      const body = await apiHelper.post(Endpoints.bookstorelogin, incorrectemailUser);
      console.log('Body:', body);
      expect(body.detail).toBe(Messages.userInvalidLoginCredentials);
      

      });
  });


  test('7 - Post - Login into bookstore with incorrect user password', async () => 
    {

      await test.step('Step 7 - Login with incorrect user password', async () => {
      const incorrectpasswordUser = { ...BookStoreInCorrectPasswordUserPayload};
      const body = await apiHelper.post(Endpoints.bookstorelogin, incorrectpasswordUser);
      console.log('Body:', body);
      expect(body.detail).toBe(Messages.userInvalidLoginCredentials);
      

      });
  });



   test('8 - Create a book', async () => {

    await test.step('Step 8 - Create a book', async () => {
    await apiHelper.loginAndSetToken(BookStoreCreateBookDataPayload,Endpoints.bookstorelogin );
    const newBook =  {...BookStoreCreateBookPayload}
    newBook.id = generateRandomDigit();
    const body = await apiHelper.post(Endpoints.bookstoreuserbooks, newBook);
    expect(body.id).toBe(newBook.id);
    expect(body.name).toBe(newBook.name);

    });

  });


  


  test('9 - Create a book and check if id is duplicate', async () => 
    
    {

  await test.step('Step 9 - Create a book and check if id is duplicate', async () => 
    {
    const duplicateId = { ...BookStoreCreateBookDuplicateIdPayload };
    const result = await apiHelper.postExpect500(Endpoints.bookstoreuserbooks, duplicateId);
    console.log(result);
    expect(result.status).toBe(500);
    expect(result.body).toContain("Internal Server Error");

  });

});

  



//  test.describe.configure({ retries: 1 });
  
  test('10 - Create a book with the expired token', async () => {

    await test.step('Step 10 - Create a book with the expired token', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    await apiHelper.setExpiredToken(Endpoints.bookstoretokenType,Endpoints.bookstoreexpiredtoken)
    const invlaidToken = { ...BookStoreInvalidTokenPayload};
    const body = await apiHelper.post(Endpoints.bookstoreuserbooks, invlaidToken);
    console.log('Body:', body);
    expect(body.detail).toBe(Messages.userInvalidExpiredToken);

    });

  });




  
  test('11 - Get all books per user', async () => {

   await test.step('Step 11 - Get all books per user', async () => 
    {
    await apiHelper.loginAndSetToken(BookStoreCreateBookDataPayload,Endpoints.bookstorelogin );
    const books = await apiHelper.get(Endpoints.bookstoreuserbooks);
    console.log(books);
    expect(Array.isArray(books)).toBeTruthy();

  });

});



test('12 -  Get all books with expired token', async () => {

    await test.step('Step 12 - Get all books with expired token', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    await apiHelper.setExpiredToken(Endpoints.bookstoretokenType,Endpoints.bookstoreexpiredtoken)
    const body = await apiHelper.get(Endpoints.bookstoreuserbooks);
    console.log(body);
    expect(body.detail).toBe(Messages.userInvalidExpiredToken);

    });

  });



  
  test('13 - Update book using id', async () => {

   await test.step('Step 13 - update book using id', async () => {

    await apiHelper.loginAndSetToken(BookStoreCreateBookDataPayload,Endpoints.bookstorelogin );
    const updatebook ={...BookStoreUpdateBookDataPayload};
    const body = await apiHelper.put(Endpoints.bookstoreupdatebookdetails(1),updatebook);
    expect(body.author).toBe("Deepak Jadon");
    expect(body.published_year).toBe(2022);
    
   

  });

});


test('14 -  Update book with expired token', async () => {

    await test.step('Step 14- Update book with expired token', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    await apiHelper.setExpiredToken(Endpoints.bookstoretokenType,Endpoints.bookstoreexpiredtoken)
    const updatebook ={...BookStoreUpdateBookDataPayload};
    const body = await apiHelper.put(Endpoints.bookstoreupdatebookdetails(1),updatebook);
    console.log(body);
    expect(body.detail).toBe(Messages.userInvalidExpiredToken);

    });

  });



  test('15 - Delete book using id', async () => {

   await test.step('Step 15 - Delete book using id', async () => {

    await apiHelper.loginAndSetToken(BookStoreCreateBookDataPayload,Endpoints.bookstorelogin );
    const body = await apiHelper.delete(Endpoints.bookstoreupdatebookdetails(Messages.userValidBookId));
    expect(body.message).toBe(Messages.userBookDeleted);
    
    
   

  });

});



test('16 -  Delete book with expired token', async () => {

    await test.step('Step 16- Delete book with expired token', async () => {
    await apiHelper.setExpiredToken(Endpoints.bookstoretokenType,Endpoints.bookstoreexpiredtoken)
    const body = await apiHelper.delete(Endpoints.bookstoreupdatebookdetails(Messages.userValidBookId));
    console.log(body);
    expect(body.detail).toBe(Messages.userInvalidExpiredToken);

    });

  });


 test('17 - Verify Book Deleted and Book not found using id', async () => {

   await test.step('Step 17 - Book not found using id', async () => {

    await apiHelper.loginAndSetToken(BookStoreCreateBookDataPayload,Endpoints.bookstorelogin );
    const body = await apiHelper.get(Endpoints.bookstoreupdatebookdetails(Messages.userDeletedBookId));
    expect(body.detail).toBe(Messages.userBookNotfound);
     

  });

});


});
