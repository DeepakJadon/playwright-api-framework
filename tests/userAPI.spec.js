const { test, request, expect } = require('@playwright/test');
const { ApiHelper } = require('../utils/apiHelper');
const testData = require('../fixtures/testData.json');

test.describe('Product API Tests', () => {
  let apiHelper;

  test.beforeAll(async () => 
    {
    const apiContext = await request.newContext({baseURL: 'https://fakestoreapi.com/',});
    apiHelper = new ApiHelper(apiContext);
  });

  test.skip('GET product list', async () => {
    const data = await apiHelper.get('/products');
    const hasMensCottonJacket = data.some(product => product.title === 'Mens Cotton Jacket');
    expect(hasMensCottonJacket).toBeTruthy();
    //expect(data.data.length).toBeGreaterThan(0);
  });


 test.skip('POST create product', async () => {
   const newProduct = testData.Product;
    const response = await apiHelper.post('/products', newProduct);
    console.log(response);
    expect(response.id).toBe(newProduct.id);
    //expect(response.job).toBe(newUser.job);
   // expect(response.id).toBeTruthy();
 });



  test.skip('Update product', async () => {
    let id =22;
   const newProduct = testData.Product;
    const response = await apiHelper.put(`/products/${id}`, newProduct);
    console.log(response);
    console.log(newProduct.title);
    expect(response.id).toBe(newProduct.id);
    expect(response.job).toBe(newUser.job);
    expect(response.id).toBeTruthy();
 });


});
