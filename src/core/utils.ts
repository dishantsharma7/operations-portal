import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password: string) => bcrypt.hashSync(password, salt);
const comparePassword = (inputPassword: string, hashedPassword: string) =>
  bcrypt.compareSync(inputPassword, hashedPassword); // Return true or false

export { hashPassword, comparePassword };
// export const enum Header {
//   API_KEY = 'x-api-key',
//   AUTHORIZATION = 'authorization',
// }
export const enum Header {
  API_KEY = 'x-api-key',
  AUTHORIZATION = 'authorization',
}
