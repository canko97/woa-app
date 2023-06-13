export default interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}
