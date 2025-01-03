import {Role} from "../../models/role.enum";

export interface User {

  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  city: string;
  bio: string;
  parentEmail: string;
  role: Role;
  isPublicAccount: boolean;
  image: string;
  isParentNotified: boolean;
}

export interface UserDto {

  firstname: string;
  lastname: string;
  username: string;
  email?: string;
  city: string;
  bio: string;
  creationDate?: Date;
  role?: Role;
  isPublicAccount: boolean;
  image?: string;
  parentEmail: string;
  isParentNotified: boolean;
}

