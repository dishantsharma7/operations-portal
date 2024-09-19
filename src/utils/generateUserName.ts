// userUtils.mjs

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Function to generate a unique username from user email
async function generateUniqueUsername(email:string) {
  let baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ''); // Extracting alphanumeric characters from email

  
  const randomSuffix = uuidv4().split('-')[0].substring(0, 3);
  const uniqueUsername = `${baseUsername}_${randomSuffix}`;

  
  const saltRounds = 10;
  const hashedUsername = await bcrypt.hash(uniqueUsername, saltRounds);

  return { username: uniqueUsername, hashedUsername };
}

export { generateUniqueUsername };
