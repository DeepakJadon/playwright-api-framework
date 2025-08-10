import { faker } from '@faker-js/faker';

export function generateUniqueEmail(base = "deepak")
 {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-:T.Z]/g, '')
    .slice(0, 14);
  return `${base}${timestamp}@example.com`;
}

export function generateRandomDigit() 
{
  return Math.floor(Math.random() * 900) + 100;  
}


export function generateBookData() 
{
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(3), 
    author: faker.person.fullName(),
    published_year: faker.date.between({ from: '1900-01-01', to: '2025-12-31' }).getFullYear(),
    book_summary: faker.lorem.sentences(2)
  };
}

