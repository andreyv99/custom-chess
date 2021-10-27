export interface userInterface {
  name: {
    firstName: string;
    lastName: string;
    userName: string;
  };
  address: {
    country: string;
    city: string;
    postalCode: number;
  };
  email: string;
  number: number;
  password: string;
  birthDate?: Date;
  gameLevel?: string;
  profileIsFull?: boolean;
}

export enum UserFormControlNameEnum {
  name = 'name',
  firstName = 'firstName',
  lastName = 'lastName',
  address = 'address',
  country = 'country',
  city = 'city',
  postalCode = 'postalCode',
  email = 'email',
  number = 'number',
  userName = 'userName',
  password = 'password',
  birthDate = 'birthDate',
  gameLevel = 'gameLevel',
  profileIsFull = 'profileIsFull',
}
