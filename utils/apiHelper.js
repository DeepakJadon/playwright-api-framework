const { request, expect } = require('@playwright/test');
const Logger = require('./logger');

class ApiHelper 
  {

  
  constructor(apiContext, baseUrl) 
  {
    this.apiContext = apiContext;
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Content-Type': 'application/json',
    };
  }



async loginAndSetToken(payload, loginEndpoint) 
  {
    const loginResponse = await this.apiContext.post(`${this.baseUrl}${loginEndpoint}`,
    {
      data: payload,
    });

    console.log(`Login endpoint : ${this.baseUrl}${loginEndpoint}`);
    console.log(payload);

    if (loginResponse.status() !== 200)
    {
      throw new Error(`Login failed with status ${loginResponse.status()}`);
    }

    const { access_token, token_type } = await loginResponse.json();
    this.defaultHeaders['Authorization'] = `${token_type} ${access_token}`;
    Logger.info(`Token set: ${token_type} ${access_token}`);
  }



    setExpiredToken(tokenType,expiredToken) 
    {
    this.defaultHeaders['Authorization'] = `${tokenType} ${expiredToken}`;
    Logger.info(`Using existing token: ${tokenType} ${expiredToken}`);
   }




  async get(endpoint) 
  {
    const response = await this.apiContext.get(endpoint, 
      {
     headers: this.defaultHeaders,
      });
    Logger.info(`GET ${endpoint}`);
    Logger.info(`Response Status: ${response.status()}`);
    //console.log(await response.text());
    //expect(response.ok()).toBeTruthy();
    return  response.json();
  }

  async post(endpoint, body) {
    console.log('Sending body:', JSON.stringify(body, null, 2));

    const response = await this.apiContext.post(endpoint, {
    headers: this.defaultHeaders,
    data: body,
  });

    console.log('HEADERS:', this.defaultHeaders);
    Logger.info(`POST ${endpoint}`);
    Logger.info(`Response Status: ${response.status()}`);
    const responseBody = await response.json();
    console.log('Request payload:', JSON.stringify(responseBody, null, 2));

    const rawtext = await response.text();
    console.log('Raw response:', rawtext); //

 // return JSON.parse(text);
    return  response.json(); 
    
  }

  async postExpect500(endpoint, body)
   {
    let parsed;
  console.log('Sending body:', JSON.stringify(body, null, 2));

  const response = await this.apiContext.post(endpoint, 
    {
    headers: this.defaultHeaders,
    data: body,
  });

  Logger.info(`POST ${endpoint}`);
  Logger.info(`Response Status: ${response.status()}`);

  const rawtext = await response.text();
  console.log('Raw response:', rawtext);

  
  if (response.status() === 500 && rawtext==="Internal Server Error")
      {
    try 
    {
      parsed = JSON.parse(rawtext);
    } 
    catch 
    {
      parsed = rawtext;
    }
      console.error(`Internal Server Error: ${parsed}`);
      expect(response.status()).toBe(500);

    } else {
      expect(response.status()).toBe(200);
      
    }

  return {
    status: response.status(),
    body: parsed
  };
}



  async put(endpoint, body) {
    const response = await this.apiContext.put(endpoint, 
      {
    headers: this.defaultHeaders,
    data: body,
      });
    Logger.info(`PUT ${endpoint}`);
    Logger.info(`Response Status: ${response.status()}`);
    return response.json();
  }

  async delete(endpoint) {
    const response = await this.apiContext.delete(endpoint, 
      {
     headers: this.defaultHeaders,
      });
     Logger.info(`DELETE ${endpoint}`);
     Logger.info(`Response Status: ${response.status()}`);
     const body = await response.json(); 
     Logger.info(`Response Body: ${JSON.stringify(body)}`);
     return body;
  }
}

module.exports = { ApiHelper };
