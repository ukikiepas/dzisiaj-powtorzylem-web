import {Role} from "./role.enum";

export interface User {

  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  city: string;
  bio: string;
  role: Role;
  isPublicAccount: boolean;

}


