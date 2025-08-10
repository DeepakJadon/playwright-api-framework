# playwright-api-framework
API automation framework using Playwright
Demo of BookStore API tests
Prerequisites

#Install python version 3.11
Verify python --version

#Install fast API dependencies
pip install fastapi==0.111.0 uvicorn==0.30.1 pydantic==2.8.2 sqlalchemy==2.0.31 PyJWT==2.4.0 passlib==1.7.4 bcrypt==4.1.3 sqlmodel==0.0.19

#Run command to start application
uvicorn main:app --reload
Application will start on http://127.0.0.1:8000/
 

#Playwright and Allure set up
npm init -y 
npm install @playwright/test --save-dev 
npm install -g allure-commandline --save-dev

#Run Playwright tests 
npx playwright test


#Created API framework to plug in CRUD tests using apiHelper class having following functions
- get
- post
- put
- delete

# Playwright - test runner ,request context, expect assertion from playwright tests library
test → Define and structure your test cases.
request (apiContext) → Send API calls in your tests.
expect → Assert and verify test results. 

#Challenges
-Login response throws undefined instead of access token and token type
-Handled 500 error response using a different post function returning body and response status
-Handled all success and error messages by creating a file
-Added logger to log API responses



