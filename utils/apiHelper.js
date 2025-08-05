const { request, expect } = require('@playwright/test');
const Logger = require('./logger');

class ApiHelper 
  {
  constructor(apiContext) 
  {
    this.apiContext = apiContext;
  }

  async get(endpoint) {
    const response = await this.apiContext.get(endpoint);
    Logger.info(`GET ${endpoint}`);
    Logger.info(`Response Status: ${response.status()}`);
    //console.log(`GET ${endpoint} - Status: ${response.status()}`);
    //console.log(await response.text());
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async post(endpoint, body) {
    const response = await this.apiContext.post(endpoint, { json: body });
    Logger.info(`GET ${endpoint}`);
    Logger.info(`Response Status: ${response.status()}`);
   // console.log(`POST ${endpoint} - Status: ${response.status()}`);
    console.log(await response.text()); 
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async put(endpoint, body) {
    const response = await this.apiContext.put(endpoint, { json: body });
    Logger.info(`GET ${endpoint}`);
    Logger.info(`Response Status: ${response.status()}`);
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async delete(endpoint) {
    const response = await this.apiContext.delete(endpoint);
    Logger.info(`GET ${endpoint}`);
    Logger.info(`Response Status: ${response.status()}`);
    expect(response.status()).toBe(204);
  }
}

module.exports = { ApiHelper };
