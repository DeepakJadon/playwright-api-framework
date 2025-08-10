// tests/crud.spec.js
import { test, request , expect } from '@playwright/test';
const { ApiHelper } = require('../utils/apiHelper');
const testDataPayload = require('../fixtures/testDataPayload.json');
const testDataUpdatedPayload = require('../fixtures/testDataUpdatedPayload.json');
import { Endpoints } from '../utils/endpoints';

test.describe.serial('FastAPI CRUD Tests', () => {

  let apiHelper;

  test.beforeAll(async () => 
    {
    const apiContext = await request.newContext({baseURL: 'http://127.0.0.1:8000/',});
    apiHelper = new ApiHelper(apiContext);
  });


let itemId=1;

  // const itemPayload = {
  //   name: "Test Item",
  //   price: 99.99,
  // };

//   const updatedPayload = {
//     name: "Updated Item",
//     price: 149.99,
//   };

  // test('POST - Create item', async ({ request }) => 
  //   {
  //   const response = await request.post('/items/1', {
  //     data: itemPayload,
  //   });
  //   expect(response.status()).toBe(200);

  //   const body = await response.json();
  //   expect(body.name).toBe(itemPayload.name);
  //   expect(body.price).toBe(itemPayload.price);

  //   itemId = 1; // Save ID for later tests
  // });


    test.skip('1 - POST create item', async () => {

      await test.step('Step 1 - POST create item', async () => {
    
    const newItem = testDataPayload.itemPayload;
    const body = await apiHelper.post(Endpoints.create, newItem);
    console.log('Body:', body);
    expect(body.name).toBe(newItem.name);

    });
    
 });


   test.skip('2 - GET - Read item', async () => 
    {

      await test.step('Step 2 - Read item', async () => {
      const newItem = testDataPayload.itemPayload;
      const response = await apiHelper.get(Endpoints.get(1));
      expect(response.name).toBe(newItem.name);

      });
  });



   test.skip('3 - PUT - Update item', async () => {

    await test.step('Step 3 - Update item', async () => {
    const newItem = testDataUpdatedPayload.itemPayload;
    const body = await apiHelper.put(Endpoints.update(1), newItem);
    console.log('Body:', body);
    expect(body.name).toBe(newItem.name);
    expect(body.price).toBe(newItem.price);
    
    });
 });


 


   test.skip('4 - DELETE & GET - Verify item is deleted', async () => {

    await test.step('Step 4 - Delete item', async () => {

    const body = await apiHelper.delete(Endpoints.delete(1));
    expect(body.name).toBe("Updated Item"); 
    const deletedbody = await apiHelper.get(Endpoints.get(1));
    expect(deletedbody.error).toBe("Item not found"); 

    });


  });



//   test('PUT - Update item', async ({ request }) => {
//     const response = await request.put(`/items/${itemId}`, {
//       data: updatedPayload,
//     });
//     expect(response.status()).toBe(200);

//     const body = await response.json();
//     expect(body.name).toBe(updatedPayload.name);
//   });




//   test('DELETE - Delete item', async ({ request }) => {
//     const response = await request.delete(`/items/${itemId}`);
//     expect(response.status()).toBe(200);
//   });

//   test('GET - Verify item is deleted', async ({ request }) => {
//     const response = await request.get(`/items/${itemId}`);
//     expect(response.status()).toBe(200); // FastAPI returns 200 with error msg
//     const body = await response.json();
//     expect(body.error).toBe("Item not found");
//   });


});
