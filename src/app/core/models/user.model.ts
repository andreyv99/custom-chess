export interface userInterface {
  name: {
    firstName: string,
    lastName: string
  };
  address: {
    country: string,
    city: string,
    postalCode: number
  };
  email: string;
  number: number;
  username: string;
  password: string;
  birthDate?: Date;
  gameLevel?: string;
}
