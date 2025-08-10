// tests/crud.spec.js
import { test, request , expect } from '@playwright/test';
const { ApiHelper } = require('../utils/apiHelper');
const UserDataPayload = require('../fixtures/UserDataPayload.json');
const ExistingUserDataPayload = require('../fixtures/ExistingUserDataPayload.json');
import { generateUniqueEmail } from '../utils/testUtil.js';
import { Endpoints } from '../utils/endpoints';

test.describe.serial('FastAPI CRUD Tests', () => {

  let apiHelper;

  test.beforeAll(async () => 
    {
    const apiContext = await request.newContext({baseURL: 'http://127.0.0.1:8000/',});
    apiHelper = new ApiHelper(apiContext);
  });


      test.skip('1 - Check health status', async () => {

      await test.step('Step 1 - Check health status', async () => {
    
    
    const body = await apiHelper.get(Endpoints.health);
    console.log('Body:', body);
    expect(body.status).toBe("Server is up and running");

    });

  });


    test.skip('2 - POST create new user', async () => {

      await test.step('Step 2 - POST create new user', async () => {
    
    //const newUser = UserDataPayload.UserData;
     const newUser = { ...UserDataPayload.UserData };
     newUser.email = generateUniqueEmail("deepak");
     const body = await apiHelper.post(Endpoints.signup, newUser);
     console.log('Body:', body);
     expect(body.message).toBe("User created successfully");

    });
    
 });


   test.skip('3 - Post - Sign up with existing user', async () => 
    {

      await test.step('Step 3 - Read item', async () => {
      const newUser = ExistingUserDataPayload.UserData;
      const body = await apiHelper.post(Endpoints.signup, newUser);
      console.log('Body:', body);
      expect(body.detail).toBe("User already exists")

      });
  });



//    test('3 - PUT - Update item', async () => {

//     await test.step('Step 3 - Update item', async () => {
//     const newItem = testDataUpdatedPayload.itemPayload;
//     const body = await apiHelper.put(Endpoints.update(1), newItem);
//     console.log('Body:', body);
//     expect(body.name).toBe(newItem.name);
//     expect(body.price).toBe(newItem.price);
    
//     });
//  });


 


//    test('4 - DELETE & GET - Verify item is deleted', async () => {

//     await test.step('Step 4 - Delete item', async () => {

//     const body = await apiHelper.delete(Endpoints.delete(1));
//     expect(body.name).toBe("Updated Item"); 
//     const deletedbody = await apiHelper.get(Endpoints.get(1));
//     expect(deletedbody.error).toBe("Item not found"); 

//     });


//   });



// //   test('PUT - Update item', async ({ request }) => {
// //     const response = await request.put(`/items/${itemId}`, {
// //       data: updatedPayload,
// //     });
// //     expect(response.status()).toBe(200);

// //     const body = await response.json();
// //     expect(body.name).toBe(updatedPayload.name);
// //   });




// //   test('DELETE - Delete item', async ({ request }) => {
// //     const response = await request.delete(`/items/${itemId}`);
// //     expect(response.status()).toBe(200);
// //   });

// //   test('GET - Verify item is deleted', async ({ request }) => {
// //     const response = await request.get(`/items/${itemId}`);
// //     expect(response.status()).toBe(200); // FastAPI returns 200 with error msg
// //     const body = await response.json();
// //     expect(body.error).toBe("Item not found");
// //   });


});
